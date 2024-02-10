function getDemoById(id,demos){
    let obj = null
    if(demos){
        demos.forEach((demo)=>{
            if(demo.id===id){
                obj = demo;
            }
        })
    }
    return obj;
}