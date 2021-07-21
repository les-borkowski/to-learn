from cs50 import get_string
import math

text = get_string("Text: ")

chars = 0
words = 1
sentences = 0

# count characters
for char in text:
    if char.isalpha():
        chars += 1
# count words
for char in text:
    if(char == " "):
        words += 1
# count sentences
for char in text:
    if(char == "." or char == "!" or char == "?"):
        sentences += 1

# calculate avg number of letters per 100 words
avgLetters = (chars / words) * 100

# calculate avg number of sentences per 100 words
avgSentences = (sentences / words) * 100

# calculate readability index
rIndex = round((0.0588 * avgLetters) - (0.296 * avgSentences) - 15.8)

if rIndex < 1:
    print("Before Grade 1")
elif rIndex > 16:
    print("Grade 16+")
else:
    print("Grade " + str(rIndex))

# for testing
# print(chars)
# print(words)
# print(sentences)
# print(avgLetters)
# print(avgSentences)
# print(rIndex)