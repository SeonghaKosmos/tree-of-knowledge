const epsilon = 0.01

export function approxEqual(num1, num2){
    if (Math.abs(num1 - num2) < epsilon){
        return true
    }
    return false
}