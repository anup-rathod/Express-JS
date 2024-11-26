interface User{
    name: String,
    lname: String,
}
interface Admin{
    name: String,
    lname: String,
}
type all = User|Admin
function userCreate(user: all ): User[]{
    return [user]
}