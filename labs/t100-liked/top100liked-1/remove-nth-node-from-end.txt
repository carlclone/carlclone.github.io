//纯编码练习 , 面向测试用例
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	if head==nil {
		return nil
	}
	dummy:=&ListNode{}
	dummy.Next = head

	l:=dummy
	r:=dummy

	for i:=1;i<=n+1;i++ {
		if r==nil {
			return dummy.Next
		}
		r=r.Next
	}

	for r!=nil {
		l=l.Next
		r=r.Next
	}
	
	delNextNode(l)
	return dummy.Next
}

func delNextNode(curr *ListNode) {
	if curr==nil {
		return 
	}
	if curr.Next==nil {
		return
	}
	curr.Next=curr.Next.Next
}
