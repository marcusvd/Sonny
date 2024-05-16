net use \\SRVAPP01\backUpdate$ /user:nostopti\nostop "sMtp2020$&"

ren ng build --configuration=production --delete-output-path --base-href  \\SRVAPP01\frontUpdate$
ng build --configuration=production
cd dist
xcopy /e /k /h /i views \\SRVAPP01\frontUpdate$\dist
pause
