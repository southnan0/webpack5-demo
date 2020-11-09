export const transformImageToBase64 = (file:any)=>{
    const reader = new FileReader();

    return new Promise((resolve)=>{
        reader.onload = (e:any)=>{
            resolve(e.target.result);
        }

        reader.readAsDataURL(file)
    })
}