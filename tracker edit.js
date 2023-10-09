var result;
const btn = document.getElementById('submitbtn');
const area = document.getElementById('display');

//adding event on submit btn click
btn.addEventListener('click', (e) => {

    
     //storing user detail as object
     const expamount=document.getElementById('amount').value;
     const expdesc=document.getElementById('desc').value;
     const expcateg=document.getElementById('sel').value;

    
     //storing user detail as object
        myobj={
         expamount,
         expdesc,
         expcateg
         };

         console.log(myobj);
         axios.get(`https://crudcrud.com/api/d504efcc34584be39c33a21a1def0fbe/appointmentData/${result}`)
        .then(response => {
            //if id match in crudcrud the perform put operation
            if (response.data._id === `${result}`) {
                axios.put(`https://crudcrud.com/api/d504efcc34584be39c33a21a1def0fbe/appointmentData/${result}`, {
                    expamount: `${myobj.expamount}`,
                    expdesc: `${myobj.expdesc}`,
                    expcateg: `${myobj.expcateg}`
                })
                    .then(resp => {
                        const newobj = {
                            expamount: myobj.expamount,
                            expdesc: myobj.expdesc,
                            expcateg: myobj.expcateg

                        }
                        showuser(newobj);
                        result = '';
                        console.log(resp + ' put is successful')
                    })
                    .catch(error => console.log(error + 'put unsuccessful'));
            }
            

        })
        .catch(error => {
            //post operation will perform if new elements are created
            axios.post('https://crudcrud.com/api/d504efcc34584be39c33a21a1def0fbe/appointmentData', myobj)
                .then((res) => {
                    showuser(res.data);
                    console.log(res + ' post successful')
                })
                .catch((err) => { console.log(err + ' post unsuccessful') })


            console.log(error + ' get action not executed')
        })

   

})


window.addEventListener("DOMContentLoaded", () => {
    axios
        .get('https://crudcrud.com/api/d504efcc34584be39c33a21a1def0fbe/appointmentData')
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                showuser(res.data[i]);
            }
        })
        .catch(err => console.log(err));
})

function showuser(user){
    var li = document.createElement('li');
    li.className = 'newline';

    li.appendChild(document.createTextNode(user.expamount));
    li.appendChild(document.createTextNode(' - '));

    li.appendChild(document.createTextNode(user.expdesc));
    li.appendChild(document.createTextNode(' - '));

    li.appendChild(document.createTextNode(user.expcateg));


    //add delete button in new li
    var delbtn = document.createElement('button');
    delbtn.className = 'del';
    //adding content delete in delbtn
    delbtn.appendChild(document.createTextNode('DELETE'));
    li.appendChild(delbtn);

    //appendig edit btn
    var editbtn = document.createElement('button');
    editbtn.className = 'edit';
    editbtn.appendChild(document.createTextNode('EDIT'));
    //appending created element to li.
    li.appendChild(editbtn);
    area.appendChild(li);

    //removing data from crud and screen on clicking delete button
    delbtn.onclick = () => {

        axios.delete(`https://crudcrud.com/api/d504efcc34584be39c33a21a1def0fbe/appointmentData/${user._id}`)
            .then(resp => console.log(resp))
            .catch(error => console.log(error));

        area.removeChild(li);
    }

    editbtn.onclick = () => {
        //copying values to input for editing.
        document.getElementById('amount').value = user.expamount;
        document.getElementById('desc').value = user.expdesc;
        document.getElementById('sel').value = user.expcateg;
        //storing id of user in result so that it can be used to find the object in crudcrud to put operation
        result = user._id;
        area.removeChild(li);
    }
}

