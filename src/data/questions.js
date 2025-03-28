// MBTI测试题库
const questions = [
  // EI维度 (外向 vs 内向)
  {
    id: 1,
    text: "在社交场合中，你通常会：",
    options: [
      { text: "认识很多新朋友，与不同的人交谈", value: "E" },
      { text: "与少数几个人深入交流，或者独自待着", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 2,
    text: "你更喜欢的工作环境是：",
    options: [
      { text: "开放式空间，可以随时与同事交流", value: "E" },
      { text: "安静的环境，可以专注于自己的工作", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 3,
    text: "当你需要重新充电时，你更倾向于：",
    options: [
      { text: "与朋友外出，参加社交活动", value: "E" },
      { text: "独处，阅读或享受安静的时光", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 4,
    text: "在团队中，你更倾向于：",
    options: [
      { text: "表达想法，主动参与讨论", value: "E" },
      { text: "先倾听他人观点，深思熟虑后再发言", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 5,
    text: "在参加聚会后，你通常会感到：",
    options: [
      { text: "精力充沛，想再多玩一会", value: "E" },
      { text: "需要独处时间来恢复精力", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 6,
    text: "当遇到问题时，你更倾向于：",
    options: [
      { text: "与他人讨论来思考解决方案", value: "E" },
      { text: "独自思考后再与他人讨论", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 7,
    text: "你认为自己更像：",
    options: [
      { text: "一本打开的书，大多数人都了解你是什么样的人", value: "E" },
      { text: "一个复杂的人，只有少数亲近的人真正了解你", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 8,
    text: "当你需要做出重要决定时，你更可能：",
    options: [
      { text: "咨询多位朋友或同事的意见", value: "E" },
      { text: "独自思考或仅咨询一两个亲近的人", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 9,
    text: "在新环境中，你通常：",
    options: [
      { text: "主动与人交谈，快速融入环境", value: "E" },
      { text: "先观察环境，慢慢适应后才融入", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 10,
    text: "午餐时间，你更喜欢：",
    options: [
      { text: "和同事一起吃饭聊天", value: "E" },
      { text: "自己一个人安静地吃饭或阅读", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 11,
    text: "你更喜欢的休闲方式是：",
    options: [
      { text: "参加派对或团体活动", value: "E" },
      { text: "在家看书、看电影或进行个人爱好", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 12,
    text: "长时间独处后，你会感到：",
    options: [
      { text: "无聊或孤独，希望与人交流", value: "E" },
      { text: "放松或满足，不会特别想见人", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 13,
    text: "当你心情不好时，你通常会：",
    options: [
      { text: "找朋友聊天或出去散心", value: "E" },
      { text: "独自反思或寻找独处的时间", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 14,
    text: "在课堂或会议上，你更可能：",
    options: [
      { text: "积极发言，分享你的想法", value: "E" },
      { text: "认真听讲，只有在有准备的情况下才发言", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 15,
    text: "对于电话沟通，你的态度是：",
    options: [
      { text: "享受通过电话与人交流", value: "E" },
      { text: "倾向于用文字沟通或只在必要时打电话", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 61,
    text: "在进行小组活动时，你通常扮演的角色是：",
    options: [
      { text: "组织者或讨论的引导者", value: "E" },
      { text: "观察者或幕后支持者", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 62,
    text: "当你回家后，你更愿意：",
    options: [
      { text: "打电话给朋友或与家人聊天", value: "E" },
      { text: "享受独处时间或安静地放松", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 63,
    text: "在朋友圈中，你通常是：",
    options: [
      { text: "认识很多人，社交网络广泛", value: "E" },
      { text: "有几个亲密朋友，关系深厚", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 64,
    text: "在面对新的工作任务时，你倾向于：",
    options: [
      { text: "与同事一起头脑风暴和讨论", value: "E" },
      { text: "先自己思考，整理好想法后再分享", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 65,
    text: "你认为自己在哪种情境下表现更好：",
    options: [
      { text: "小组合作，团队互动", value: "E" },
      { text: "独立工作，自主完成", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 66,
    text: "当你长时间参与社交活动后，你会：",
    options: [
      { text: "感到精力充沛，希望继续社交", value: "E" },
      { text: "感到精力消耗，需要时间独处恢复", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 67,
    text: "你更喜欢的生日庆祝方式是：",
    options: [
      { text: "举办派对，邀请众多朋友庆祝", value: "E" },
      { text: "与少数亲密的人一起安静庆祝", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 68,
    text: "当你想法很多时，你倾向于：",
    options: [
      { text: "向别人倾诉，通过交流整理思路", value: "E" },
      { text: "写下来或在脑海中整理，然后可能分享成型的想法", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 69,
    text: "你更享受哪种学习方式：",
    options: [
      { text: "小组讨论和互动学习", value: "E" },
      { text: "自学或一对一辅导", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 70,
    text: "在接到一个好消息后，你第一反应是：",
    options: [
      { text: "立即分享给朋友或家人", value: "E" },
      { text: "先自己消化一下，选择合适的时机分享", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 71,
    text: "在工作场所的午休时间，你更愿意：",
    options: [
      { text: "与同事一起吃饭聊天", value: "E" },
      { text: "找个安静的地方休息或处理个人事务", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 72,
    text: "在讨论中，你更倾向于：",
    options: [
      { text: "边思考边说话，在交流中形成观点", value: "E" },
      { text: "先思考成熟后再发言", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 73,
    text: "当面对困难时，你更可能：",
    options: [
      { text: "寻求他人的建议和支持", value: "E" },
      { text: "自己思考解决方案，必要时才寻求帮助", value: "I" }
    ],
    dimension: "EI"
  },
  {
    id: 74,
    text: "你希望的工作环境是：",
    options: [
      { text: "充满活力，有很多人际互动", value: "E" },
      { text: "安静专注，有独立空间", value: "I" }
    ],
    dimension: "EI"
  },
  
  // SN维度 (实感 vs 直觉)
  {
    id: 16,
    text: "当你观察事物时，你更关注：",
    options: [
      { text: "具体的细节和实际的事实", value: "S" },
      { text: "整体模式和未来可能性", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 17,
    text: "你更倾向于相信：",
    options: [
      { text: "实际经验和可靠的信息", value: "S" },
      { text: "直觉和灵感", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 18,
    text: "在学习新知识时，你更喜欢：",
    options: [
      { text: "循序渐进，掌握实用技能", value: "S" },
      { text: "了解概念和理论，探索可能性", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 19,
    text: "你更喜欢的故事类型是：",
    options: [
      { text: "现实生活中可能发生的事情", value: "S" },
      { text: "充满想象力和创意的故事", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 20,
    text: "当阅读文章时，你更注意：",
    options: [
      { text: "具体事实和细节", value: "S" },
      { text: "整体意义和潜在含义", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 21,
    text: "你更愿意从事的工作类型是：",
    options: [
      { text: "有明确步骤和结果的工作", value: "S" },
      { text: "需要创新和构想的工作", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 22,
    text: "当你观察一幅画时，你首先注意到：",
    options: [
      { text: "技术细节和精确度", value: "S" },
      { text: "给你的整体感觉和象征意义", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 23,
    text: "在解决问题时，你通常依靠：",
    options: [
      { text: "过去的经验和已知方法", value: "S" },
      { text: "新的思路和创新方法", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 24,
    text: "在交友时，你看重的是：",
    options: [
      { text: "可靠性和一致性", value: "S" },
      { text: "创意和想象力", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 25,
    text: "在小组讨论中，你更可能：",
    options: [
      { text: "确保讨论不偏离主题", value: "S" },
      { text: "引入新的思路和可能性", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 26,
    text: "你认为更重要的是：",
    options: [
      { text: "实事求是，脚踏实地", value: "S" },
      { text: "有远见，着眼未来", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 27,
    text: "在描述事件时，你更倾向于：",
    options: [
      { text: "按时间顺序详细描述发生了什么", value: "S" },
      { text: "重点描述事件给你的感受和想法", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 28,
    text: "你更欣赏的能力是：",
    options: [
      { text: "实际操作和执行能力", value: "S" },
      { text: "创新思维和概念化能力", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 29,
    text: "面对未来，你更关注：",
    options: [
      { text: "如何根据现实情况做好规划", value: "S" },
      { text: "未来可能出现的各种可能性", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 30,
    text: "在购买产品时，你更注重：",
    options: [
      { text: "实用性和耐用性", value: "S" },
      { text: "新颖性和独特设计", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 75,
    text: "当你需要学习使用新软件时，你倾向于：",
    options: [
      { text: "按照指南一步步操作", value: "S" },
      { text: "先尝试操作，摸索其功能和可能性", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 76,
    text: "当描述一个事件时，你会更侧重于：",
    options: [
      { text: "准确地描述发生了什么", value: "S" },
      { text: "事件的意义和它给你的启示", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 77,
    text: "你更喜欢哪种类型的电影：",
    options: [
      { text: "基于真实故事或现实生活的", value: "S" },
      { text: "科幻、奇幻或充满象征意义的", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 78,
    text: "当你阅读说明书时，你更注重：",
    options: [
      { text: "具体步骤和操作细节", value: "S" },
      { text: "理解原理和创新使用方法", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 79,
    text: "在进行新项目时，你更关注：",
    options: [
      { text: "确保每个细节都考虑到并得到实施", value: "S" },
      { text: "项目的整体愿景和创新可能", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 80,
    text: "在欣赏艺术作品时，你更注重：",
    options: [
      { text: "艺术家的技巧和作品的细节", value: "S" },
      { text: "作品传达的情感和隐含的意义", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 81,
    text: "当面对复杂问题时，你更擅长：",
    options: [
      { text: "分析具体事实，找出实际解决方案", value: "S" },
      { text: "看到问题的不同角度，提出创新想法", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 82,
    text: "你更关注：",
    options: [
      { text: "当下的现实和实际情况", value: "S" },
      { text: "未来的可能性和潜在发展", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 83,
    text: "当谈论你的兴趣爱好时，你更倾向于：",
    options: [
      { text: "描述你实际做了什么", value: "S" },
      { text: "谈论这些活动如何启发你的想法", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 84,
    text: "你更容易记住：",
    options: [
      { text: "人的面孔和他们说的具体内容", value: "S" },
      { text: "人给你的整体印象和感觉", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 85,
    text: "在旅行中，你更可能：",
    options: [
      { text: "关注和欣赏眼前的景色和体验", value: "S" },
      { text: "想象这些地方的历史和背后的故事", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 86,
    text: "你更相信：",
    options: [
      { text: "亲眼所见和亲身经历", value: "S" },
      { text: "直觉感受和内心的启示", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 87,
    text: "当你讲述一个故事时，你通常：",
    options: [
      { text: "按照事件发生的顺序，包含具体细节", value: "S" },
      { text: "强调故事的主题和寓意，可能跳过某些细节", value: "N" }
    ],
    dimension: "SN"
  },
  {
    id: 88,
    text: "在选择职业时，你更看重：",
    options: [
      { text: "稳定可靠，有明确职责的工作", value: "S" },
      { text: "有创新空间，能够探索不同可能性的工作", value: "N" }
    ],
    dimension: "SN"
  },
  
  // TF维度 (思考 vs 情感)
  {
    id: 31,
    text: "做决定时，你更注重：",
    options: [
      { text: "客观分析和逻辑推理", value: "T" },
      { text: "考虑对人的影响和价值观", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 32,
    text: "当朋友向你倾诉问题时，你通常会：",
    options: [
      { text: "帮助分析问题并提供解决方案", value: "T" },
      { text: "提供情感支持和理解", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 33,
    text: "在评价一个决策时，你更看重：",
    options: [
      { text: "是否合理高效", value: "T" },
      { text: "是否符合人道和价值观", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 34,
    text: "你更欣赏他人的哪种品质：",
    options: [
      { text: "清晰的思维和专业能力", value: "T" },
      { text: "同理心和善解人意", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 35,
    text: "当你需要做出重要决定时，你会：",
    options: [
      { text: "列出利弊，进行客观分析", value: "T" },
      { text: "考虑这个决定对你和他人的情感影响", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 36,
    text: "在给予反馈时，你更注重：",
    options: [
      { text: "诚实直接，指出问题所在", value: "T" },
      { text: "委婉表达，避免伤害感情", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 37,
    text: "当团队中出现冲突时，你更关注：",
    options: [
      { text: "找出问题的根源和解决方案", value: "T" },
      { text: "维护团队和谐和成员感受", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 38,
    text: "在评判一个人的行为时，你更倾向于：",
    options: [
      { text: "根据客观标准和规则来评判", value: "T" },
      { text: "考虑特殊情况和个人情感", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 39,
    text: "在职场中，你更希望得到的是：",
    options: [
      { text: "基于业绩的公正认可", value: "T" },
      { text: "对个人贡献的热情赞赏", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 40,
    text: "你认为人际沟通中最重要的是：",
    options: [
      { text: "清晰、准确地表达事实和想法", value: "T" },
      { text: "理解对方感受并建立情感联系", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 41,
    text: "在批评他人时，你更注重：",
    options: [
      { text: "指出事实和逻辑上的缺陷", value: "T" },
      { text: "考虑对方的感受和自尊心", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 42,
    text: "在处理自己的情绪时，你倾向于：",
    options: [
      { text: "理性分析情绪产生的原因", value: "T" },
      { text: "充分体验和表达自己的感受", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 43,
    text: "在阅读新闻报道时，你更倾向于：",
    options: [
      { text: "关注事实和数据", value: "T" },
      { text: "关注人物故事和情感体验", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 44,
    text: "你认为一个好领导应该：",
    options: [
      { text: "做出合理决策并有效执行", value: "T" },
      { text: "关心团队成员并激发他们的潜能", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 45,
    text: "在解决道德问题时，你更依赖：",
    options: [
      { text: "普遍适用的原则和规则", value: "T" },
      { text: "具体情况和个人价值观", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 89,
    text: "在处理矛盾时，你更倾向于：",
    options: [
      { text: "注重公平和合理性，基于事实解决问题", value: "T" },
      { text: "顾及各方感受，寻求和谐的解决方案", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 90,
    text: "当参与团队项目时，你更看重：",
    options: [
      { text: "任务完成的效率和质量", value: "T" },
      { text: "团队成员之间的和谐与合作", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 91,
    text: "你认为更重要的是：",
    options: [
      { text: "保持客观公正，不受个人情感影响", value: "T" },
      { text: "表达同理心，考虑他人感受", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 92,
    text: "在做出艰难决定时，你更依赖：",
    options: [
      { text: "逻辑分析和客观事实", value: "T" },
      { text: "个人价值观和对他人的影响", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 93,
    text: "你更倾向于：",
    options: [
      { text: "直言不讳，即使可能引起不适", value: "T" },
      { text: "委婉表达，避免造成冲突", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 94,
    text: "当朋友做了让你不满的事情时，你会：",
    options: [
      { text: "直接指出问题所在，期待解决", value: "T" },
      { text: "考虑对方感受，寻找合适时机表达", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 95,
    text: "在评价一个项目时，你更关注：",
    options: [
      { text: "结果是否达到了预定的标准", value: "T" },
      { text: "这个项目对参与者和受众的意义", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 96,
    text: "在解决争端时，你认为最重要的是：",
    options: [
      { text: "找出真相，明确谁对谁错", value: "T" },
      { text: "恢复和谐，确保每个人都感觉被尊重", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 97,
    text: "当需要给出反馈意见时，你会：",
    options: [
      { text: "直接指出问题和改进方向", value: "T" },
      { text: "先肯定优点，再婉转提出建议", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 98,
    text: "你更倾向于基于什么来做决定：",
    options: [
      { text: "事实和数据分析", value: "T" },
      { text: "个人价值观和对他人的考虑", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 99,
    text: "在工作环境中，你更看重：",
    options: [
      { text: "明确的角色和责任划分", value: "T" },
      { text: "良好的团队氛围和个人发展", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 100,
    text: "在听取他人意见时，你更关注：",
    options: [
      { text: "他们的观点是否合理有效", value: "T" },
      { text: "他们表达的情感和价值观", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 101,
    text: "你认为更好的领导风格是：",
    options: [
      { text: "注重结果和明确目标", value: "T" },
      { text: "关注团队成员的需求和成长", value: "F" }
    ],
    dimension: "TF"
  },
  {
    id: 102,
    text: "在面对冲突时，你的首要目标是：",
    options: [
      { text: "找出问题的根源并解决它", value: "T" },
      { text: "减少分歧，恢复和谐关系", value: "F" }
    ],
    dimension: "TF"
  },
  
  // JP维度 (判断 vs 感知)
  {
    id: 46,
    text: "关于日常生活，你更喜欢：",
    options: [
      { text: "有计划和安排好的日程", value: "J" },
      { text: "灵活应对，随机应变", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 47,
    text: "你的工作区域通常是：",
    options: [
      { text: "整洁有序，物品各有定位", value: "J" },
      { text: "创意混乱，随手可及", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 48,
    text: "当面对一个项目时，你更倾向于：",
    options: [
      { text: "提前计划，按步骤完成", value: "J" },
      { text: "灵活应对，根据情况调整", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 49,
    text: "你更喜欢的生活方式是：",
    options: [
      { text: "有规律，可预测的生活", value: "J" },
      { text: "自由，充满变化的生活", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 50,
    text: "在做计划时，你更偏向：",
    options: [
      { text: "提前安排好所有细节", value: "J" },
      { text: "保留空间以便随时调整", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 51,
    text: "你对待截止日期的态度是：",
    options: [
      { text: "严格遵守，通常提前完成", value: "J" },
      { text: "视为参考，根据情况灵活应对", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 52,
    text: "你更喜欢的旅行方式是：",
    options: [
      { text: "有详细的行程安排", value: "J" },
      { text: "随性而行，看心情决定", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 53,
    text: "当任务完成后，你通常会：",
    options: [
      { text: "立即开始下一个任务", value: "J" },
      { text: "放松一下，享受完成的成就感", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 54,
    text: "在面对变化时，你的第一反应是：",
    options: [
      { text: "担心变化带来的不确定性", value: "J" },
      { text: "好奇新的可能性", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 55,
    text: "你更偏好的工作方式是：",
    options: [
      { text: "有明确的目标和截止日期", value: "J" },
      { text: "有探索和调整的空间", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 56,
    text: "你更容易因为哪种情况而感到压力：",
    options: [
      { text: "缺乏计划和结构", value: "J" },
      { text: "太多规则和限制", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 57,
    text: "在准备一次演讲或报告时，你更可能：",
    options: [
      { text: "提前准备好，反复练习", value: "J" },
      { text: "大致准备，保留即兴发挥的空间", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 58,
    text: "在购物时，你通常：",
    options: [
      { text: "带着购物清单，有明确目标", value: "J" },
      { text: "随意浏览，看到喜欢的就买", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 59,
    text: "对于生活中的意外情况，你的态度是：",
    options: [
      { text: "尽量避免，喜欢可预测的环境", value: "J" },
      { text: "接受并享受变化带来的新鲜感", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 60,
    text: "在决策过程中，你更倾向于：",
    options: [
      { text: "尽快做出决定并执行", value: "J" },
      { text: "保持开放态度，继续收集信息", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 103,
    text: "你更喜欢的生活节奏是：",
    options: [
      { text: "有序、可预测、按部就班", value: "J" },
      { text: "随性、自由、富有变化", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 104,
    text: "对于未来，你更倾向于：",
    options: [
      { text: "制定明确的目标和计划", value: "J" },
      { text: "保持开放态度，根据情况调整", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 105,
    text: "你的桌面或工作区通常是：",
    options: [
      { text: "整洁有序，物品分类放置", value: "J" },
      { text: "有些杂乱，但你知道东西在哪里", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 106,
    text: "对于规则和流程，你的态度是：",
    options: [
      { text: "重要的结构，应该遵循", value: "J" },
      { text: "有用的指南，但有时可以灵活调整", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 107,
    text: "在处理日常任务时，你更喜欢：",
    options: [
      { text: "按照优先级完成，一次做一件事", value: "J" },
      { text: "根据兴趣和灵感同时处理多项任务", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 108,
    text: "在项目接近截止日期时，你通常：",
    options: [
      { text: "已经按计划基本完成", value: "J" },
      { text: "在最后时刻赶工完成", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 109,
    text: "你更欣赏哪种类型的人：",
    options: [
      { text: "可靠、守时、有条理的人", value: "J" },
      { text: "适应性强、创意丰富、随性的人", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 110,
    text: "你更倾向于如何处理电子邮件和消息：",
    options: [
      { text: "及时回复，保持收件箱整洁", value: "J" },
      { text: "在有时间或感兴趣时回复，可能积累一段时间", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 111,
    text: "在完成任务前，你更注重：",
    options: [
      { text: "按照计划和时间表进行", value: "J" },
      { text: "保持灵活性，随时调整方向", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 112,
    text: "你对意外变化的反应通常是：",
    options: [
      { text: "感到不安，希望恢复原计划", value: "J" },
      { text: "容易适应，甚至可能觉得有趣", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 113,
    text: "在度假时，你更喜欢：",
    options: [
      { text: "有详细的行程和活动安排", value: "J" },
      { text: "即兴决定要做什么，保持探索的乐趣", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 114,
    text: "你的待办事项清单通常是：",
    options: [
      { text: "详细列出并按优先级排序", value: "J" },
      { text: "简单记录或完全在脑海中", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 115,
    text: "当面对多个选择时，你倾向于：",
    options: [
      { text: "尽快确定一个选择并坚持", value: "J" },
      { text: "探索所有可能性，延迟决定", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 116,
    text: "对于做事的方法，你更喜欢：",
    options: [
      { text: "有明确的步骤和流程", value: "J" },
      { text: "根据情况即兴发挥", value: "P" }
    ],
    dimension: "JP"
  },
  {
    id: 117,
    text: "在管理时间方面，你通常：",
    options: [
      { text: "精确分配时间，尽量避免延误", value: "J" },
      { text: "灵活安排，根据当时情况调整", value: "P" }
    ],
    dimension: "JP"
  }
];

export default questions; 