export function getGymById(id,gyms){
    let obj = null;
    if(gyms){
        gyms.forEach((gym)=>{
            if(gym.id === id){
                obj = gym;
            }
        })
    }
    return obj;
}