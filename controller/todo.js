
 let todoList = [
  {
    id: `1`,
    taskName: `practice data structure and algorithm`,
    description: `learn it from the ppts provided by the teacher and also from the book`,
    status: false,
    deadline: `12/07/2022`, 
    priority: `1`

  },
  {
    id: `2`,
    taskName: `learning java script `,
    description: `to learn java script ....join nohub academy`,
    status: false,
    deadline: `12/09/2021`,
    priority: `2`
  },

  {
    id:`3`,
    taskname: `learning html and css`,
    description:` to  learn html and css  join nohub academy`,
    status:`false`,
    deadline:`15/09/2021`,
    priority:`3`
  }
];



const todoController = {
  
  create: (req, res) => {
    console.log(`Hello ,this is for creating new ID`);
    const { body } = req;
    const {id}=req.params;
    const randomUniqueId=Math.floor(Math.random() * 1000000)
    const newTask = {
     
      id:randomUniqueId,
      ...body,
       
    }
    // let n=0;
    // for(let i=0;i<todoList.length;i++) {
    // if(id===todoList[i].id){ 
    //  n=n+1;
    //     // todoList.push(body);
    //     res.send({
    //       message: 'Id already exist',
    //       status: 'true',
          
    //     })
    //   }
     // if(n===0)
    { todoList.push(newTask);
      res.send({
        message: 'added successfully',
        status: 'true',
         
      })
      
    }
     
    
    

  },
  update: (req,res) => {
    console.log('hello,this is from the update ');
    const { body } = req;
    const { id } = req.params;
    
    for(let i=0;i<todoList.length;i++){
      if(todoList[i].id==id)
      {
        todoList[i]={...todoList[i], ...body};
        console.log("This is from update if block");
   
      }
    }
    
   
    res.send({
     message:'updated successfully',
     status:true,
   });
   
     },
     delete: (req,res) => {
      console.log('hello,this is from the delete');
      const { body } = req;
      const { id } = req.params;
      
      for(let i=0;i<todoList.length;i++){
        if(todoList[i].id==id)
        {
           todoList.splice(i , 1);
          console.log("This is from delete if block");
     
        }
      }
      
     
      res.send({
       message:'deleted successfully',
       status:true,
     });
     
       },

       getEachTask :(req,res) => { 
        console.log('hello,this is from getEachTask ');
        const { id } = req.params;
        todoList.forEach(element =>{
          if(element.id ==id){ 
            
            return res.send({
              
              status:'SUCCESS',
              element
             
            });
          }
          
        }  
        );}, 
         markAsCompleted:(req,res)=>{
          console.log('hello,this is from the markAsaComplete ');
          const { body } = req;
          const { id } = req.params;
          
          for(let i=0;i<todoList.length;i++){
            if(todoList[i].id==id)
            {
              todoList[i].status=body.status;
              console.log('this is from if block of marke as completed');
         
            }
          }
          
         
          res.send({
           message:'updated successfully',
           status:true,
         });

         },

        
  fetchList: (req, res) => {

    
    res.send(todoList);
    console.log(`Hello ,this is fetchList`);
  }
}

 module.exports = todoController;