const SERVER = 'https://localhost:44336/'

class Server_api{
    async get_news(api, data){
        try{
            const res = await fetch(`${SERVER}home`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Access-type':'application/json'
                }
                })
                if(!res.ok){
                    throw 'Error with review'
                }
                return res.json();

        }catch(error){
            
        }
        
    }

    async get_trainers(api, data){
        try{
            const res = await fetch(`${SERVER}trainers`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Access-type':'application/json'
                }
                })
                if(!res.ok){
                    throw 'Error with review'
                }
                return res.json();

        }catch(error){
            
        }
        
    }

    async get_trainersinf(api, data){
        try{
            const res = await fetch(`${SERVER}trainers_inf`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Access-type':'application/json'
                }
                })
                if(!res.ok){
                    throw 'Error with review'
                }
                return res.json();

        }catch(error){
            
        }
        
    }

    async add_call(api, data){
        try{
            const res = await fetch(`${SERVER}addCall`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Access-type':'application/json'
                }
                })
                if(!res.ok){
                    throw 'Error with review'
                }
                return res.json();

        }catch(error){
            
        }
    }

    async add_trainer(api, data){
        try{
            const res = await fetch(`${SERVER}addTrainer`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Access-type':'application/json'
                }
                })
                if(!res.ok){
                    throw 'Error with review'
                }
                return res.json();

        }catch(error){
            
        }
    }

   
}

export default Server_api;