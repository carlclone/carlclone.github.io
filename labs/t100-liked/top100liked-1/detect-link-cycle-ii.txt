/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func detectCycle(head *ListNode) *ListNode {
	if head==nil {
		return nil
	}

	slow:=head
	fast:=head
	entry:=head

	for fast!=nil && fast.Next!=nil {
		slow=slow.Next
		fast=fast.Next.Next
		if slow==fast {
		    // https://leetcode.com/problems/linked-list-cycle-ii/discuss/44793/O(n)-solution-by-using-two-pointers-without-change-anything/44358
			// 找到的最好的解释 https://cs.stackexchange.com/questions/10360/floyds-cycle-detection-algorithm-determining-the-starting-point-of-cycle
			// 数学逻辑思维很差 , 一遇到规律推导的就 gg
			// 这里是用直觉理解的 , fast 到环的入口的时候 , 比slow 多跑了 head 到 entry 的长度,  所以如果他多跑这个长度 , 那他们相遇的地方就会是入口?
			// 数学逻辑 , 规律推导要怎么补强啊

			// 特例法 猜测观察规律 , 假设 1 圈后遇到, 就别推导证明了
			for slow!=entry {
				slow=slow.Next
				entry=entry.Next
			}
			return slow
		}
	}

	return nil
}
