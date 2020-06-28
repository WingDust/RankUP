function Stack(){
    this._size=0
    this._storage={}
}

Stack.prototype.push=function(data){//向栈中添加
    let size=this._size++
    this._storage[size]=data //size将会对象的key，data成为value
}

Stack.prototype.pop=function(){//栈中删除最新添加的元素
    let size=this._size,deletedDate;
    if(size){//用来判断stack是否为空栈,不然会有size -1出现
        deletedData=this._storage[size]

        delete this._storage[size]
        this._size--

        return deletedData
    }
}

function Queue(){
    this._oldstIndex=1
    this._newstIndext=1
    this._storage={}
}

Queue.prototype.size=funciton(){
    return this._newstIndex-this._oldstIndex
}

Queue.prototype.enqueue=funciton(data){
    this._storage[this._newstIndex]=data
    this._newstIndex++
}

Queue.prototype.dequeue=funciton(){
    let oldstIndex=this._oldstIndex,deletedData=this._storage[oldstIndex];
    if(oldstIndex!=newestIndex){
        delete this._storage[oldstIndex]
        this._oldstIndex++

        return deleteData
    }
}

