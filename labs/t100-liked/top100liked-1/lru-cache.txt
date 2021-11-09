// 错了好多地方 , 之前的教训没记住 , 编码复杂的先拆成 sub problem , 然后先把大局上的过程 肉眼走通 ,相当于伪代码
// 人肉 debug 速度好慢 , 有什么技巧,方法吗 , 不要太依赖机器,工具

//还是写完多走几个 test case 吧 , 能触碰到 corner 的 case

// 坏习惯 很可怕
type LRUCache struct {
	//加速读操作
	m map[int]*Node

	//记录顺序信息
	dhead *Node
	dtail *Node

	size int
	cap int

}

type Node struct {
	Key int
	Val int
	Next *Node
	Prev *Node
}

func addNodeAfter(curr,new *Node) {
	oldNext:=curr.Next

	curr.Next = new
	new.Prev = curr

	new.Next=oldNext

	//这里出错
	if oldNext!=nil {
		oldNext.Prev = new
	}
}

func delNode(node *Node) {
	pre:=node.Prev
	next:=node.Next

	pre.Next = next
	next.Prev=pre
}


func Constructor(capacity int) LRUCache {
	dhead:=&Node{}
	dtail:=&Node{}
	addNodeAfter(dhead,dtail)
	return LRUCache{
		m:    make(map[int]*Node),
		dhead: dhead,
		dtail: dtail,
		size: 0,
		cap:capacity,
	}
}


func (this *LRUCache) Get(key int) int {
	node,ok:=this.m[key]
	if ok {
		delNode(node)
		addNodeAfter(this.dhead,node)
		return node.Val
	} else {
		return -1
	}
}


func (this *LRUCache) Put(key int, value int)  {
	oldNode,ok:=this.m[key]
	if ok {
		oldNode.Val=value
		delNode(oldNode)
		addNodeAfter(this.dhead,oldNode)
	} else {
		if this.size==this.cap {
			//这里出错
			prev:=this.dtail.Prev
			delete(this.m,prev.Key)
			delNode(prev)
			this.size--
		}

		newNode:=&Node{
			Val:  value,
			Key: key,
		}
		this.m[key] = newNode
		addNodeAfter(this.dhead,newNode)
		this.size++
	}
}


/**
 * Your LRUCache object will be instantiated and called as such:
 * obj := Constructor(capacity);
 * param_1 := obj.Get(key);
 * obj.Put(key,value);
 */