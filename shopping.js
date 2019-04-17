

   var table = document.getElementById('Table'); // 购物车表格
   var checkInpus = document.getElementsByClassName('check'); // 所有勾选框
   var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
   var tr = table.children[1].rows; //行
   var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
   var priceTotal = document.getElementById('priceTotal'); //总计
   var selected=document.getElementById('selected');
   var foot = document.getElementById('foot');
   var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
   var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
   var closing=document.querySelector('.closing');


//计算
function getTotal() {
    var selected = 0, price = 0, html = '';
    var HTMLstr=''// 做一个空的字符串，然后进行拼接
    for (var i = 0; i < tr.length; i++) {
        if (tr[i].getElementsByTagName('input')[0].checked) {
            tr[i].className='on'
            selected += parseInt(tr[i].getElementsByTagName('input')[1].value); //计算已选商品数目
            price += parseFloat(tr[i].getElementsByTagName('td')[4].innerHTML); //计算总计价格
            HTMLstr+= '<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'">取消选择</span></div>'
            
        }
        else{
            tr[i].className=''
        }
    }
    selectedTotal.innerHTML = selected; // 已选数目
    priceTotal.innerHTML = price.toFixed(2); // 总价
    selectedViewList.innerHTML=HTMLstr;

    if(selected==0){
        foot.className='foot'
    }
}
//小计.算单行价格
function getSubTotal(tr){
    var tds=tr.cells;

    var price=parseFloat(tds[2].innerHTML);
    var count=parseInt(tr.getElementsByTagName('input')[1].value);// 数目input
    var SubTotal=parseFloat(price*count)
    tds[4].innerHTML=SubTotal.toFixed(2)
}


    // 点击选择框
    for(var i = 0; i < checkInpus.length; i++ ){
        checkInpus[i].onclick = function () {    
            if(this.className==='check-all check'){ //如果是全选，则吧所有的选择框选中
                for(var j=0;j<checkInpus.length;j++){
                    checkInpus[j].checked=this.checked
                    // getTotal();//选完更新总计
                }
            }
            
            if(this.checked==false){ //只要有一个未勾选，则取消全选框的选中状态
                for(var k=0;k<checkAllInputs.length;k++){
                    checkAllInputs[k].checked=false;
                }
            }   
            getTotal();//选完更新总计
        }
    }

    selected.onclick=function(){
        if(foot.className=='foot'){
            if(selectedTotal.innerHTML!=0){
                foot.className='foot show'
            }
           
        }else{
            foot.className='foot'
        }
    }
    //已选商品弹层中的取消选择按钮
    selectedViewList.onclick = function (e) {
        // var e = e || window.event;
        var el = e.srcElement;
        if (el.className=='del') {
            var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
            input.checked = false;
            input.onclick()
        }
    }

    for(var i=0;i<tr.length;i++){
        tr[i].onclick=function(e){
            var el=e.target;
            var cls=el.className;//通过事件对象的target属性获取触发元素
            var input=this.getElementsByTagName('input')[1];// 数目input
            var val=parseInt(input.value) //数目
            //通过判断触发元素的class确定用户点击了哪个元素
            var reduce=this.getElementsByTagName('span')[1];
            switch(cls){
               
                case 'add'://点击了加号
                input.value=val+1
                reduce.innerHTML='-'
                getSubTotal(this);
                getTotal();
                break;
                case 'reduce': //点击了减号
                if(val>1){
                    input.value=val-1
                }
               if(input.value<=1){
                reduce.innerHTML=''
               }
               getSubTotal(this);
               getTotal();
                break;
               
                case 'delete':
                var conf=confirm('确定要删除吗？')
                if(conf){
                    this.parentNode.removeChild(this);

                }
                break;
                default:
                break
                
            }

        }
        tr[i].getElementsByTagName('input')[1].onkeyup=function(){
            var val=parseInt(this.value);
            var tr=this.parentNode.parentNode
            var reduce=tr.getElementsByTagName('span')[1];
            if(isNaN(val)||val<1){
                val=1   
            }
            this.value=1;
            if (val<=1){
                reduce.innerHTML=''
            }else{
                reduce.innerHTML='-'
            }

            
            getSubTotal(this.parentNode.parentNode);//input的父节点就是td  td的父节点就是tr
        }

    }
    // 点击全部删除
    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            var con = confirm('确定删除所选商品吗？'); //弹出确认框
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    // 如果被选中，就删除相应的行
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                        i--; //回退下标位置
                    }
                }
            }
        } else {
            alert('请选择商品！');
        }
        getTotal(); //更新总数
    }

    closing.onclick=function(){
        alert('请打开付款码支付：'+priceTotal.innerHTML+'$')
    }
















    
