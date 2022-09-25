let m = 0
let a = -1
let arr = [0,1,2,2,4,4,1]
for(let i = 0 ; i<arr.length ; i ++)
{
    if(i%2 == 0 && arr[i] > m)
    {
        m =arr[i]
        a = i
    }
}
console.log(a) 