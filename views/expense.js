

const buypremium=document.getElementById('buypremium');
buypremium.addEventListener('click', async(e) => {
   const Razorpay = require('razorpay');
   console.log('clicked');
   e.preventDefault();
   const token=localStorage.getItem('token');
   const res= await axios.get('http://3.109.55.181:3000/purchase/premiummembership',{headers:{"Authorization" : token}});
   console.log(res);
   var option = {
       "key":res.data.key_id,
       "orderid":res.data.order.id,
       "handler":async function(response){
           await axios.post('http://3.109.55.181:3000/purchase/updatetransactionstatus',{
               order_id:option.orderid,
               payment_id:res.razorpay_payment_id,
           },{headers:{"Authorization" : token}});
           alert('you are premium user now');
       }
   }
   const rzp1=new Razorpay(option);
       rzp1.open();
       e.preventDefault();

       rzp1.on('payment.failed', function(response){
           console.log(response);
           alert('something went wrong');
       })

})

   function expensedata(e) {
       e.preventDefault();
       const amount = document.getElementById('amount').value;
       const description = document.getElementById('desc').value;
       const category = document.getElementById('sel').value;
       const obj = { amount: amount, description: description, category: category };
       const promise = addtodb(obj);
   }

   async function addtodb(obj) {
       try {
           const token = localStorage.getItem('token');
               const res = await axios.post('http://3.109.55.181:3000/addData', obj, {headers:{"Authorization" : token}});
               showonscreen(res.data.datas);
       }
       catch (err) {
           console.log('error in adding to db');
           console.log(err);
       }
   }

   function showonscreen(obj) {
       const div = document.createElement('div');
       const li = document.createElement('li');

       li.appendChild(document.createTextNode(obj.amount));
       li.appendChild(document.createTextNode('-'));
       li.appendChild(document.createTextNode(obj.category));
       li.appendChild(document.createTextNode('-'));
       li.appendChild(document.createTextNode(obj.description));
       
       const del = document.createElement('button');
       del.innerHTML = 'DELETE EXPENSE';
       li.appendChild(del);

      
       div.appendChild(li);
       display.appendChild(div);

       del.addEventListener('click', async(e) => {
           display.removeChild(div);
           const token = localStorage.getItem('token');
           const data = await axios.post('http://3.109.55.181:3000/delete', obj, {headers:{"Authorization" : token}});
           console.log(data);
       })

      

   }


   function fetchdata(obj) {
       document.getElementById('amount').value = obj.amount;
       document.getElementById('desc').value = obj.description;
       document.getElementById('sel').value = obj.category;
   }

   function creatediv(obj) {
       const li = document.createElement('li');

       li.appendChild(document.createTextNode(obj.amount));
       li.appendChild(document.createTextNode('-'));
       li.appendChild(document.createTextNode(obj.category));
       li.appendChild(document.createTextNode('-'));
       li.appendChild(document.createTextNode(obj.description));
       // li.appendChild(document.createTextNode(obj.amount));
       const del = document.createElement('button');
       del.innerHTML = 'DELETE';
       li.appendChild(del);

      
       return li;
   }

   window.addEventListener('DOMContentLoaded', async () => {
       try {
           const token = localStorage.getItem('token');
           console.log(token);
           const res = await axios.get('http://3.109.55.181:3000/getAllData', {headers:{"Authorization" : token}});
           for (let i = 0; res.data.datas.length; i++) {
               showonscreen(res.data.datas[i]);
           }
       }
       catch (err) {
           console.log('error in getting all data');
           console.log(err);
       }
   })