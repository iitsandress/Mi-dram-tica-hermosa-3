#!/usr/bin/env python3
# chat_summarizer.py
# Simple script to summarize chat by counting important keywords and recent messages.

import re, json, sys
from collections import Counter
def load_chat(path):
    with open(path, encoding='utf-8') as f:
        return f.read()
def summarize(text, top_n=10):
    msgs = re.findall(r'\[(.*?)\].*?: (.*)', text)
    words = Counter()
    for _, m in msgs:
        for w in re.findall(r"[a-záéíóúñ]{2,}", m.lower()):
            words[w]+=1
    return words.most_common(top_n)
if __name__=='__main__':
    path = sys.argv[1] if len(sys.argv)>1 else 'whatsapp_chat.txt'
    text = load_chat(path)
    print("Top words:", summarize(text, top_n=20))
