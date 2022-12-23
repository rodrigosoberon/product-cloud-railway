const obj={}
process.on('message', msg =>{
    const cantidad = parseInt(msg)
    for(let i=0; i < cantidad ; i++){
        const numero = Math.floor(Math.random()*1000)
        if(obj[numero]){
            obj[numero] += 1;
        }else{
            obj[numero] = 1
        }
    }
    process.send(obj)
})