Function CheckGoogleDriveIsRunning {
    $DriveProcess = Get-Process -Name 'GoogleDriveFS' -ErrorAction SilentlyContinue

    $pathUnit = GMy Drive

    if (Test-Path($pathUnit)) {

        if ($DriveProcess) {
            Write-host('Nuvem Esta rodando....')
            return $true
        }
    }
    else {

        Write-host(Nuvem esta parada.)
        return $false

    }
}

Export-ModuleMember -Function CheckGoogleDriveIsRunning