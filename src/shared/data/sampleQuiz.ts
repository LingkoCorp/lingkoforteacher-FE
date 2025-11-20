// src/data/quizSample.js

import { QuizData } from "@/types/quiz";

export const sampleQuiz : QuizData = {
  situation: "손님이 많은 주말 오후, 카페 아르바이트생이 주문을 받고 음료를 제공하며 결제와 관련된 일반적인 서비스를 처리하는 상황.",
  expressions: [
    {
      korean: "어서 오세요! 주문 도와드리겠습니다.",
      romanization: "Eoseo oseyo! Jumun dowadeurigetseumnida.",
      translation: "Welcome! I can take your order."
    },
    {
      korean: "무엇으로 주문하시겠어요?",
      romanization: "Mueoseuro jumunhasigesseoyo?",
      translation: "What would you like to order?"
    },
    {
      korean: "따뜻하게 드릴까요, 차갑게 드릴까요?",
      romanization: "Ttatteuthage deurilkkaeyo, chagapge deurilkkaeyo?",
      translation: "Would you like that hot or iced?"
    },
    {
      korean: "사이즈는 레귤러와 라지 중에 어떤 것으로 하시겠어요?",
      romanization: "Saijeuneun regyulleowa laji junge eotteon geoseuro hasigesseoyo?",
      translation: "Which size would you like, regular or large?"
    },
    {
      korean: "매장에서 드시고 가세요, 포장해 드릴까요?",
      romanization: "Maejangeseo deusigo gaseyo, pojanghae deurilkkayo?",
      translation: "Is that for here or to go?"
    },
    {
      korean: "잠시만 기다려 주시겠어요?",
      romanization: "Jamsiman gidaryeo jusigesseoyo?",
      translation: "Could you wait for a moment?"
    },
    {
      korean: "결제는 카드로 하시겠어요, 현금으로 하시겠어요?",
      romanization: "Gyeoljeneun kadeuro hasigesseoyo, hyeongeumeuro hasigesseoyo?",
      translation: "Will you be paying by card or cash?"
    },
    {
      korean: "총 만 삼천 원입니다.",
      romanization: "Chong man samcheon wonimnida.",
      translation: "The total is thirteen thousand won."
    },
    {
      korean: "주문하신 아메리카노 나왔습니다. 맛있게 드세요.",
      romanization: "Jumunhasin amerikano nawasseumnida. Masitge deuseyo.",
      translation: "Your Americano is ready. Enjoy your drink."
    },
    {
      korean: "진동벨 울리면 음료를 받아가 주세요.",
      romanization: "Jindongbel ullimyeon eumnyoreul badaga juseyo.",
      translation: "Please pick up your drink when the buzzer rings."
    }
  ],
  vocabulary: [
    { korean: "주문", romanization: "jumun", translation: "order" },
    { korean: "결제", romanization: "gyeolje", translation: "payment" },
    { korean: "포장", romanization: "pojang", translation: "takeout/packaging" },
    { korean: "매장", romanization: "maejang", translation: "in-store/shop" },
    { korean: "손님", romanization: "sonnim", translation: "customer/guest" },
    { korean: "아르바이트생", romanization: "areubaiteusaeng", translation: "part-time worker (often 'albaseng')" },
    { korean: "음료", romanization: "eumnyo", translation: "beverage/drink" },
    { korean: "거스름돈", romanization: "geoseureumdon", translation: "change (money)" },
    { korean: "영수증", romanization: "yeongsujeung", translation: "receipt" },
    { korean: "추가", romanization: "chuga", translation: "addition/extra" },
    { korean: "할인", romanization: "harin", translation: "discount" },
    { korean: "샷", romanization: "syat", translation: "shot (espresso)" },
    { korean: "시럽", romanization: "sireop", translation: "syrup" },
    { korean: "디저트", romanization: "dijeoteu", translation: "dessert" },
    { korean: "적립", romanization: "jeongnip", translation: "to save/accumulate (points)" },
    { korean: "카드", romanization: "kadeu", translation: "card" },
    { korean: "현금", romanization: "hyeongeum", translation: "cash" },
    { korean: "품절", romanization: "pumjeol", translation: "sold out" },
    { korean: "준비되다", romanization: "junbidoeda", translation: "to be ready/prepared" },
    { korean: "제공하다", romanization: "jegonghada", translation: "to offer/provide" }
  ],
  grammar_points: [
    {
      korean: "-(으)로 하다",
      romanization: "-(eu)ro hada",
      translation: "To choose/decide on (using a choice)",
      example: "결제는 카드로 하시겠어요?"
    },
    {
      korean: "-(으)시겠어요?",
      romanization: "-(eu)sigesseoyo?",
      translation: "Would you like to... (Polite offer/question)",
      example: "매장에서 드시고 가시겠어요?"
    },
    {
      korean: "-아/어/여 드리다",
      romanization: "-a/eo/yeo deurida",
      translation: "To do [action] for the benefit of the customer (Polite/Honorific)",
      example: "영수증을 따로 챙겨 드리겠습니다."
    },
    {
      korean: "-(으)ㄹ까요?",
      romanization: "-(eu)lkkaoyo?",
      translation: "Shall I/we... / Do you want me to... (Proposing a choice or action)",
      example: "따뜻하게 드릴까요, 차갑게 드릴까요?"
    },
    {
      korean: "-습니다/-ㅂ니다",
      romanization: "-seumnida/-mnida",
      translation: "Formal polite ending (Used when addressing a customer or public)",
      example: "총 만 삼천 원입니다."
    }
  ]
};
