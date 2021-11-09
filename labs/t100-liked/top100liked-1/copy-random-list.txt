type Node struct {
	Val    int
	Next   *Node
	Random *Node
}

//是一道简单题,但是糟糕的编码习惯导致了多个低级错误 , 而且命名又开始随意了 , 写完要肉眼跑 case 才到 leetcode submit
func copyRandomList(head *Node) *Node {
	// 哈希表 建立 旧 pointer -> 新 pointer 的映射
	m := make(map[*Node]*Node)

	dummy := &Node{}

	old := head
	news := dummy
	//遍历旧 list , 每个 node,产生一个新 node
	for old != nil {
		newNode := &Node{Val: old.Val}
		news.Next = newNode
		news = news.Next

		m[old] = newNode
		old = old.Next
	}

	news = dummy.Next
	old = head
	for old != nil {
		nodeInMap, ok := m[old.Random]
		if ok {
			news.Random = nodeInMap
		}
		news = news.Next
		old = old.Next
	}
	return dummy.Next
}
