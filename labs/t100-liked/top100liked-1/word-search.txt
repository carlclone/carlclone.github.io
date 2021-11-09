// 定义良好的函数名和变量 , walk , 结果是没出大错 , 就 outOfIdx 写反了 , 点赞

//Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
//Output: true
func exist(board [][]byte, word string) bool {
	visited:=make([][]bool,len(board))
	t:=Solution{
		board:   board,
		word:    word,
		visited: visited,
	}

	for k,_:=range visited {
		visited[k] = make([]bool,len(board[0]))
	}
	for i,_:=range board {
		for k,_:=range board[i] {
			if t.walk(i,k,0) {
				return true
			}
		}
	}
	return false
}

type Solution struct {
	board [][]byte
	word string

	visited [][]bool
}

func (t *Solution) walk(row,col int,strIdx int) bool {
	if t.outOfIdx(row,col) {
		return false
	}
	if len(t.word)-1==strIdx && t.board[row][col]==t.word[strIdx] && !t.visited[row][col] {
		return true
	}

	if t.visited[row][col] {
		return false
	}
	if t.board[row][col]!=t.word[strIdx] {
		return false
	}

	t.visited[row][col]=true

	//继续 walk
	directs:=[][]int{
		{-1,0}, //up
		{1,0}, //down
		{0,-1}, //left
		{0,1}, //right
	}
	for _,d:=range directs {
		res:=t.walk(row+d[0],col+d[1],strIdx+1)
		if res==true {
			t.visited[row][col]=false
			return true
		}
	}
	t.visited[row][col]=false
	return false
}

func (t *Solution) outOfIdx(row int, col int) bool {
	maxRow:=len(t.board)-1
	maxCol:=len(t.board[0])-1
	return !(row>=0 && row<=maxRow && col>=0 && col<=maxCol)
}
