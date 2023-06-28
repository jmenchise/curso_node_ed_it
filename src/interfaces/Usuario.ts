export interface Usuario {
   id: string,
   firstName: string,
   lastName: string,
   city: string,
   streetName: string,
   country: string,
   accountName: string,
   account: string,
   amount: number
};
export interface User {
   id?: string,
   userName: string,
   clearPassword: string,
   encryptedPassword?: string,
   salt?: string,
   token?: string,
};


