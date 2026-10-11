param([switch]$KeepResults)
$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
$taskDirectory = Join-Path ([IO.Path]::GetTempPath()) ('portfolio-validation-' + [guid]::NewGuid().ToString('N'))
$bundledRoot = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node'
$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $bundledRoot 'bin\node.exe' }
if (-not (Test-Path -LiteralPath $nodePath)) { throw 'Node.js가 필요합니다. Node.js LTS 설치 후 다시 실행하세요.' }
New-Item -ItemType Directory -Path $taskDirectory | Out-Null
$dependencyPath = Join-Path $bundledRoot 'node_modules'
try {
    if (-not (Test-Path -LiteralPath (Join-Path $dependencyPath 'playwright\package.json'))) {
        $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
        if (-not $npmCommand) { throw 'Playwright가 없습니다. Node.js LTS(npm 포함)를 설치한 뒤 다시 실행하세요.' }
        $dependencyPath = Join-Path $taskDirectory 'dependencies\node_modules'
        & $npmCommand.Source install --prefix (Join-Path $taskDirectory 'dependencies') --no-audit --no-fund playwright
        if ($LASTEXITCODE -ne 0) { throw '검증 도구 설치에 실패했습니다.' }
    }
    & $nodePath (Join-Path $PSScriptRoot 'verify-local.mjs') $repoPath (Join-Path $taskDirectory 'results') $dependencyPath
    if ($LASTEXITCODE -ne 0) { throw '검증 실행이 중단되었습니다. 위 오류를 확인하세요.' }
    $resultPath = Join-Path $taskDirectory 'results'
    Compress-Archive -Path (Join-Path $resultPath '*') -DestinationPath (Join-Path $taskDirectory '검증결과.zip')
    Start-Process (Join-Path $resultPath 'report.html')
    Write-Host "검수 후 이 ZIP을 대화에 첨부하세요: $(Join-Path $taskDirectory '검증결과.zip')"
    if (-not $KeepResults) {
        $choice = Read-Host '결과를 지금 삭제할까요? 첨부 전에는 N을 선택하세요 (Y/N, 기본 N)'
        if ($choice -eq 'Y') {
            $resolvedTask = [IO.Path]::GetFullPath($taskDirectory)
            $resolvedTemp = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\') + '\'
            if (-not $resolvedTask.StartsWith($resolvedTemp, [StringComparison]::OrdinalIgnoreCase) -or
                (Split-Path $resolvedTask -Leaf) -notmatch '^portfolio-validation-[a-f0-9]{32}$') { throw '임시 폴더 경로 확인 실패' }
            Remove-Item -LiteralPath $resolvedTask -Recurse -Force
            Write-Host '이번 검증의 임시 결과와 임시 설치 파일을 삭제했습니다.'
        }
    }
} catch {
    Write-Host "실패: $_"
    Write-Host "이번 실행의 임시 폴더: $taskDirectory"
    exit 1
}
