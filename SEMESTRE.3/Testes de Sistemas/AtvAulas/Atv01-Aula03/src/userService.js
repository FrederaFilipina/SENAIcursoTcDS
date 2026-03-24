
export function createUser(userData) {

    if(!userData.name){
        throw new Error ("O nome do usuário obrigatório.")
    }

    if(userData.age < 18){
        throw new Error("Idade inferior a mínima permitida")
    }
    
    return{
        id: Math.floor(Math.random() * 1000),
        name: userData.name,
        age: userData.age,
        isActive: true,
        roles: ["user"]
    }
}