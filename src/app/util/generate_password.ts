/**
 * fonction qui permet de generer un mot de passe
 * @param length 
 * @returns 
 */
export const passwordGenerate=(length=20)=>{
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}