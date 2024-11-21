import argparse

parser = argparse.ArgumentParser()
parser.add_argument('filename',type=str,help='.txt file to convert from blank space-separated anagram list to json.')
args = parser.parse_args()

anagrams = [[]]
length = -1
last_word = ''

with open(args.filename, 'r') as file:
    for line in file:
        if line.rstrip() == '' and anagrams[-1] != []: # New anagram set.
            anagrams.append([])
        else:
            anagrams[-1].append(line.rstrip())
            if length > -1:
                if length != len(line.rstrip()):
                    raise ValueError(f'Mismatch in string length: words with lengths {length}: {last_word} and {len(line.rstrip())}: {line.rstrip()} coexist.')
            length = len(line.rstrip())
            last_word = line.rstrip()
    
output = f'{{"length":{length},"total":{len(anagrams)},"anagrams":[' + ','.join(['[' + ','.join([f'"{word}"' for word in anagram_set]) +  ']' for anagram_set in anagrams]) + ']}'

with open(args.filename.split('.')[0]+'.json','w') as file:
    file.write(output)