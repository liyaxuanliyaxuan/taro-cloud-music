/*
 * @Date: 2020-11-27 11:00:17
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-27 13:02:33
 */
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g


 export function initLines (lrc) {
    // 解析代码
    const resLines = []
    const lines = lrc.split ('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines [i];// 如 "[00:01.997] 作词：薛之谦"
      
    //  Executes a search on a string 
    // using a regular expression pattern, 
    // and returns an array containing the results of that search.

      let result = timeExp.exec (line);
      if (!result) continue;
      const txt = line.replace (timeExp, '').trim ();// 现在把时间戳去掉，只剩下歌词文本
      if (txt) {
        if (result [3].length === 3) {
          result [3] = result [3]/10;//[00:01.997] 中匹配到的 997 就会被切成 99
        }
        resLines.push ({
          time: result [1] * 60 * 1000 + result [2] * 1000 + (result [3] || 0) * 10,// 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
          txt
        });
      }
    }
     resLines.sort ((a, b) => {
      return a.time - b.time;
    });// 根据时间排序
    return resLines;
  }