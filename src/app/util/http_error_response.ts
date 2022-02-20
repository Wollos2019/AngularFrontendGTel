import { HttpErrorResponse } from "@angular/common/http";

export const extractErrorMessagesFromErrorResponse=(errorReponse: HttpErrorResponse)=>{
    const errors=[];
    if(errorReponse.error){
        console.log(errorReponse.error.errors);
            if(errorReponse.error.message){
                errors.push(errorReponse.error.message);
            }
       
        if(errorReponse.error.errors){
            for (const property in errorReponse.error.errors){
                const proertyErrors:Array<string>= errorReponse.error.errors[property];
                proertyErrors.forEach(error => errors.push(error))
            }
        }
    };
    return errors;
}