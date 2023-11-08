# Audio API
## 介绍
Audio API 用于处理音频信息，它可以用于播放音频，获取音频信息，以及对音频进行操作。
## 对象
`AudioContext`对象用于创建音频上下文，它是一个抽象的音频处理环境，可以用于创建各种音频节点，以及控制它们的连接。
## 节点
`AudioContext`对象上有两个方法，分别是`createMediaElementSource`和`createMediaStreamSource`，分别用于创建音频元素节点和音频流节点。
## 时域数据和频域数据
`AudioContext`对象上有一个`createAnalyser`方法，用于创建音频分析器，它可以用于获取音频的时域数据和频域数据。
### 时域数据
时域数据是音频的波形数据，它是一个`Uint8Array`类型的数组，数组中的每一项都是一个`0-255`之间的整数，表示音频的振幅。
### 频域数据
频域数据是音频的频谱数据，它是一个`Uint8Array`类型的数组，数组中的每一项都是一个`0-255`之间的整数，表示音频的频谱。

## 示例
```js
// 创建音频上下文
const audioContext = new AudioContext();
// 创建音频元素节点,表示音频来源
const audioElement = document.createElement('audio');
// 创建音频元素节点
const audioElementSource = audioContext.createMediaElementSource(audioElement);
// 创建音频流节点
const audioStreamSource = audioContext.createMediaStreamSource(audioStream);
// 创建音频分析器
const analyser = audioContext.createAnalyser();
// 连接音频元素节点和音频分析器
audioElementSource.connect(analyser);
// 连接音频流节点和音频分析器
audioStreamSource.connect(analyser);
// 获取时域数据
const timeDomainData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteTimeDomainData(timeDomainData);
// 获取频域数据
const frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);
```
