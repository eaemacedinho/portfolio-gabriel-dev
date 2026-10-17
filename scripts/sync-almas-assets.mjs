import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Pull first-party app screenshots from the current public preview.
// Three high-resolution images are from the public App Store listing; Sala and Eventos
// are real legacy screenshot crops until their original files can be published.
const assets = [
  {
    "file": "inicio.jpg",
    "url": "https://id-preview--d9453a16-3c7f-4d1d-80d9-83a1c54e67fb.lovable.app/__l5e/assets-v1/1e5873a3-f1e1-4b10-8d1b-87296fe0bb94/almas-appstore-inicio.jpg",
    "min": 100000
  },
  {
    "file": "jogos.jpg",
    "url": "https://id-preview--d9453a16-3c7f-4d1d-80d9-83a1c54e67fb.lovable.app/__l5e/assets-v1/6ac1a0d6-ecf3-437e-b8f2-275fee5d86c9/almas-appstore-jogos.jpg",
    "min": 100000
  },
  {
    "file": "missal.jpg",
    "url": "https://id-preview--d9453a16-3c7f-4d1d-80d9-83a1c54e67fb.lovable.app/__l5e/assets-v1/03576b29-13d1-49cd-b2ec-8915ba961688/almas-appstore-missal.jpg",
    "min": 100000
  },
  {
    "file": "sala.webp",
    "url": "https://id-preview--d9453a16-3c7f-4d1d-80d9-83a1c54e67fb.lovable.app/__l5e/assets-v1/b2ba5669-8be8-4a05-ada6-43d7cc8691c0/almas-sala.webp",
    "min": 4000
  },
  {
    "file": "eventos.webp",
    "url": "https://id-preview--d9453a16-3c7f-4d1d-80d9-83a1c54e67fb.lovable.app/__l5e/assets-v1/1097a680-3e53-425f-a89f-25d5c636b568/almas-eventos.webp",
    "min": 4000
  }
];
const dest="public/projects/almas";
await mkdir(dest,{recursive:true});
let failure=false;
for(const item of assets){
  try{
    const response=await fetch(item.url,{headers:{"User-Agent":"portfolio-asset-sync/1.0"}});
    if(!response.ok)throw Error("HTTP "+response.status);
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length<item.min)throw Error("Asset unexpectedly short: "+bytes.length);
    await writeFile(join(dest,item.file),bytes);
    console.log("OK",item.file,bytes.length);
  }catch(err){failure=true;console.error("FAIL",item.file,err);}
}
if(failure)process.exitCode=1;
