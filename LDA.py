import pymongo
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer ,WordNetLemmatizer
from nltk.tokenize import RegexpTokenizer
from nltk import pos_tag
import re
from gensim import corpora
from gensim.models import LdaModel

def get_documents( operator,nb_docs):
 myclient = pymongo.MongoClient("mongodb://localhost:27017/")
 db = myclient["dump"]
 mycol=db['Medias']
 query={"ID_operator":operator}
 a = mycol.find(query)
 articles=[]
 for b in a[0:nb_docs]:
     articles.append(b['Text'])
 return articles

def tf_idf(documents):
    new_documents=[]
    all_words=[]
    tf_idf=[]
    if operator in ["ORDS.QA","ATM","Djezzy"]:
        lang="french"
    else:
        lang="english"

    stop_words = list(set(stopwords.words(lang)))
    tokenizer = RegexpTokenizer(r'\w+')
    lemmatizer = WordNetLemmatizer()
    ps= PorterStemmer()

    for doc in documents:
        tags=['VB','MD','VBZ','CC','DT','EX','IN']
        word_tokens = tokenizer.tokenize(doc)
        tok=[s[0] for s in pos_tag(word_tokens) if s[1] not in tags ]
        filtered_sentence = [lemmatizer.lemmatize(w) for w in tok if  w.lower() not in stop_words and w not in operator]
        all_words.extend(filtered_sentence)
        new_documents.append(filtered_sentence)

    dictionary = corpora.Dictionary([d.split() for d in all_words if d.replace(' ','').isdigit()==False])
    dictionary.add_documents(new_documents)
    #filter words that appear in less than 5 docs , more than half of docs , keep  100000words
    dictionary.filter_extremes(no_below=5, no_above=0.5, keep_n=100000)
    #print(dictionary)

    mycorpus = [dictionary.doc2bow(doc) for doc in new_documents]
    #print(mycorpus)
    '''
    for i in range(0,len(new_documents)):
        dict={}
        for word in all_words:
            dict[word]=new_documents[i].count(word)
        tf_idf.append(dict)

    #print(tf_idf)
    '''
    return  dictionary,mycorpus




# CHOOSE THE OPERATOR
operator="Vodafone"
nb_docs=135
documents=get_documents(operator,nb_docs)
mydict,corpus=tf_idf(documents)

# Save the Dict and Corpus
#mydict.save('mydict.dict')  # save dict to disk
#corpora.MmCorpus.serialize('bow_corpus.mm', corpus)  # save corpus to disk

# Load them back
'''
mydict = corpora.Dictionary.load('mydict.dict')
corpus = corpora.MmCorpus('bow_corpus.mm')
'''
nb_topic=3
lda = LdaModel(corpus,id2word=mydict, num_topics=nb_topic, passes=2,per_word_topics=False,iterations=200)
#lda.save('lda_model.model')
ldaa=[]
for i in range(0,nb_topic):
    d=re.findall('"([^"]*)"', lda.print_topic(i,300))
    for word in d:
        if len(word)>3 and len(ldaa)%3!=4 and word not in ldaa:
            ldaa.append(word)
print(ldaa[0:20])


#print(lda.show_topics(num_topics=2, num_words=500, log=True))
