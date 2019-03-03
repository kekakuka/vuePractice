const vm=new Vue({
    el:'#app',
    data:{
        todoList: localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):[
            {text:"Eat",isSelected:true},{text:"Sleep",isSelected:false}
        ],
        current:null,
        flag:'blue'
    },
    watch:{
        todoList:{
            handler(){localStorage.setItem('data',JSON.stringify(this.todoList))},deep:true
        }
    },
    directives:{
        color(el,bindings){

            el.style.backgroundColor=bindings.value;

        },
        focus(el,bindings){
            console.log(bindings.value);
            if(bindings.value){
                el.focus();
            }
        }
    },
    methods:{
        addTodo(){
                   this.todoList.push( {text:event.target.value,isSelected:false});
                 event.target.value="";
        },
        updateTodo(event,i){
            this.todoList= this.todoList.map(item=>item===i?item={text:event.target.value,isSelected:i.isSelected}:item)
            this.current=null;
        },
        deleteItem(i){
            this.todoList=this.todoList.filter(item=>item!==i);
        },
        remember(todo){
             this.current=todo;
        },
        cancel(){this.current=null}
    },
   computed:{
        count(){
            return this.todoList.filter(item=>item.isSelected===false).length;
        }
   }
});