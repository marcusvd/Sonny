
$DriveA = "C:\util2\Backup\"
$DriveB = "v:\util\Backup\"
$Date = Get-Date -Format "dd_MM_yyyy"
$VmsVhdx = "V:\vms\"


Function CheckFreeSpaceDisk {
    Param([Parameter(ValueFromPipeLine)]
        [string]$DriverLetter
    )
    return $FreeSpaceDisk1 = Get-WmiObject Win32_LogicalDisk -Filter "DeviceID='$DriverLetter'"  | % { [Math]::Round(($_.FreeSpace / 1GB), 2) }
}
#CheckFreeSpaceDisk -DriverLetter "c:"

Function CalcFilesSize {
    Param([Parameter(ValueFromPipeline)]
        [string]$pathToFile, [string]$extension 
    )

    $pathFiles = Join-Path -Path $pathToFile -ChildPath $extension


    $getAllFfiles = Get-ChildItem -Path $pathFiles -Recurse

    $vhdxTotalSize = $null

    $getAllFfiles.ForEach({
            $vhdxTotalSize += $_.Length
        })

    return $gbSize = $vhdxTotalSize | % { [Math]::Round(($_ / 1GB), 2) }


}
#CalcFilesSize -pathToFile "V:\vms\" -extension "*.vhd*"

Function BackUpCopy {
    Param([Parameter(ValueFromPipeLine)]
        [string]$target, [string]$destiny
    )

    $Date = Get-Date -Format "dd_MM_yyyy"

    $destinyPlace = Join-Path -Path $destiny -ChildPath $Date

    #Copy-Item -Path $target -Destination $destinyPlace -Recurse -Force

    Write-Host($target, $destinyPlace)

}
#BackUpCopy -target '\\SRVHV01\V$\vms\*' -destiny 'C:\util\scripts'

Function DeleteOlderFiles {
    Param([Parameter(ValueFromPipeLine)]
        [string]$PathFilesToDelete
    )

    Get-ChildItem  -Path $PathFilesToDelete | Remove-Item -recurse

    $MakeFile = Join-Path -Path $PathFilesToDelete.Split('\')[0] -ChildPath $PathFilesToDelete.Split('\')[1]

    New-Item -Path $MakeFile -ItemType file -Name "Lastclean.txt" -Value $Date

}
#DeleteOlderFiles -PathFilesToDelete $DriveA


$DriveAToStorageBackup = (CheckFreeSpaceDisk -DriverLetter $DriveA.Split('\')[0])
$DriveBToStorageBackup = (CheckFreeSpaceDisk -DriverLetter $DriveB.Split('\')[0])


$VmsToBackup = CalcFilesSize -pathToFile $VmsVhdx -extension "*.vhd*"


$resultTwoDisk = ($DriveAToStorageBackup) -and ($DriveBToStorageBackup) -gt ($VmsToBackup)


if ($resultTwoDisk) {

    $ResultDriveA = ($DriveAToStorageBackup) -gt ($VmsToBackup)

    if ($ResultDriveA) {

        BackUpCopy -target '\\SRVHV01\V$\vms\*' -destiny $DriveA

    }
    else {

        BackUpCopy -target '\\SRVHV01\V$\vms\*' -destiny $DriveB

    }

}

else {

    $pathDateBpkFileDriveA = Join-Path -Path $DriveA.Split('\')[0] -ChildPath $DriveA.Split('\')[1]
    $fileFullPathDriveA = Join-Path -Path $pathDateBpkFileDriveA -ChildPath "lastClean.txt"



    $pathDateBpkFileDriveB = Join-Path -Path $DriveB.Split('\')[0] -ChildPath $DriveB.Split('\')[1]
    $fileFullPathDriveB = Join-Path -Path $pathDateBpkFileDriveB -ChildPath "lastClean.txt"






    $fileDriveA = Get-Item -Path $fileFullPathDriveA
    $fileDriveA.CreationTime


    $fileDriveB = Get-Item -Path $fileFullPathDriveB
    $fileDriveB.CreationTime


    $olderDateFiles = $fileDriveA.LastWriteTime -le $fileDriveB.LastWriteTime


    if ($olderDateFiles) {

        DeleteOlderFiles -PathFilesToDelete $DriveA
        New-Item -Name "lastClean.txt" -Path $pathDateBpkFileDriveA -Value $Date -Force
        BackUpCopy -target '\\SRVHV01\V$\vms\*' -destiny $DriveA

    }
    else {

        DeleteOlderFiles -PathFilesToDelete $DriveB
        New-Item -Name "lastClean.txt" -Path $pathDateBpkFileDriveB -Value $Date -Force
        BackUpCopy -target '\\SRVHV01\V$\vms\*' -destiny $DriveB

    }





}


