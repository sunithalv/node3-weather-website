console.log('Client side javascript file is loaded')




const weatherForm = document.querySelector('form')
const search=document.querySelector('#address')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()
const locationVal =search.value
message1.textContent='Loading...'
message2.textContent=''
fetch('/weather?address='+locationVal).then((response)=>{

    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
            message2.textContent=''
        }else{
            message1.textContent=data.location
            message2.textContent=data.forecast

        }
    
    
    })
    })
})

