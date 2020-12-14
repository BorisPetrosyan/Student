export class Validators {
   static required(value = '') {
    return value && value.trim()
    }
    static requiredSelect(text = '') {
              return text => {
                return  text !== text
              }
        }
    
    // static minLength(length) {
    //     return value => {
    //         return  value.length >= length
    //     }
    // }
}