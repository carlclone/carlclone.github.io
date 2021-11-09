/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy:=&ListNode{}
    curr:=dummy
    carry:=0
    for l1!=nil &&l2!=nil {
        newNode:=&ListNode{}
        v:=l1.Val+l2.Val+carry
        l1=l1.Next
        l2=l2.Next
        
        
        newNode.Val=v%10
        carry= v/10
        curr.Next=newNode
        curr=curr.Next
    }
    
    for l1!=nil {
        newNode:=&ListNode{}
        v:=l1.Val+carry
        l1=l1.Next
        
        newNode.Val=v%10
        carry= v/10
        curr.Next=newNode
        curr=curr.Next
    } 
    
    for l2!=nil {
        newNode:=&ListNode{}
        v:=l2.Val+carry
        l2=l2.Next
        
        newNode.Val=v%10
        carry= v/10
        curr.Next=newNode
        curr=curr.Next
    }
    
    if carry!=0 {
        curr.Next=&ListNode{Val:1}
    }
    
    
    
    return dummy.Next
}