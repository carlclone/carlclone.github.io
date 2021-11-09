
```
func isValidBST(root *TreeNode) bool {
	if root==nil {
		return false
	}
	s:=Solution{nums:make([]int,0)}
	s.inOrder(root)
	for i:=1;i<len(s.nums);i++ {
		if s.nums[i-1]>=s.nums[i] {
			return false
		}
	}
	return true
}

type Solution struct {
	nums []int
}


func (s *Solution) inOrder(root *TreeNode) {
	if root==nil {
		return
	}
	s.inOrder(root.Left)
	s.nums=append(s.nums,root.Val)
	s.inOrder(root.Right)
}
```

之前做过,有印象,也不难,但是时间和空间复杂度不太好
想到了下面这种方法,但是没有写对,还是参考了 leetcode
记忆力真的挺重要的,但是我的记忆力....这个似乎没什么好办法解决

总结:
递归问题, 把子节点看成黑盒 , 整棵树当做只有 3 个节点(上课的时候学到的思考方法,有老师带着还是事半功倍)
麻烦写完之后人肉跑几个case , 总会发现问题
联想的时候最多 2 个点,再多我就把前面的忘了, 脑子缓存太小了,得用笔


```
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

 //中序遍历后是有序的

func isValidBST(root *TreeNode) bool {
	s:=Solution{0,true}
	return s.checkValid(root)
}

type Solution struct {
	preVal int
	isFirst bool
}


func (s *Solution) checkValid(root *TreeNode) bool {
	if root==nil {
		return true
	}
	if (!s.checkValid(root.Left)) {
		return false
	}
	if !s.isFirst && s.preVal>=root.Val {
		return false
	}
	if s.isFirst {
		s.isFirst=false
	}
	s.preVal=root.Val
	if (!s.checkValid(root.Right)) {
		return false
	}
	return true
}
```