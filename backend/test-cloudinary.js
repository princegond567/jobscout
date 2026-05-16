import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'princegond',
  api_key: '393858797894977',
  api_secret: 'DGQZj4mgAlV41HG4Nj3ZBpPKC1M'
});

async function run() {
  const fileContent = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCgkJPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqCjw8IC9MZW5ndGggMjEgPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9GCg==";
  try {
    const resRaw = await cloudinary.uploader.upload(fileContent, { resource_type: "raw" });
    console.log("RAW:", resRaw.secure_url);
  } catch (err) {
    console.log("Err RAW", err.message);
  }

  try {
    const resRawFormat = await cloudinary.uploader.upload(fileContent, { resource_type: "raw", format: "pdf" });
    console.log("RAW+FORMAT:", resRawFormat.secure_url);
  } catch (err) {
    console.log("Err RAW+FORMAT", err.message);
  }

  try {
    const resAuto = await cloudinary.uploader.upload(fileContent, { resource_type: "auto" });
    console.log("AUTO:", resAuto.secure_url);
  } catch (err) {
    console.log("Err AUTO", err.message);
  }
}

run();
