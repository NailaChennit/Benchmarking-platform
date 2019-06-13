import random
import pymongo
import operator
import json 

import sys

if __name__ == '__main__':  
    
   
    def Calculate_distance(center,object):
        distance=0
        #(25 %, 35 %, 25 %, 15 %) resp(macro, operational, media, financial)
        for attribute in attributes:
            min=statistics['min_'+attribute]
            normalize=statistics['max_'+attribute]-min
            if normalize==0:
                normalize=1
            distance+= ((((center[attribute]-min)-(object[attribute]-min))/normalize)*weights[attribute])**2
        return distance**0.5

    def Clustering(list_of_objects,centers):
        clusters = {}
        distances = {}  # key is indice of center , value is distance with object
        for i in range(0, len(centers)):
            clusters[str(centers[i]['_id'])]=[]
        # assign each object to the closest cluster
        for object in list_of_objects:
            for i in range(0, len(centers)):
                distances[i] = Calculate_distance(centers[i], object)

            mini = min(distances,key=distances.get)  # get the closest center
            clusters[str(centers[mini]['_id'])].append(object)

        return clusters #clusters is a dict , the key is the id of the center , value is list of other objects

    def Get_mean_of_cluster(cluster):
        mean={}
        for attribut in attributes:
            #print(attribut)
            values = []
            #print(cluster)
            for object in cluster:
                #print(object)
                values.append(object[attribut])
            values.sort()
            #print(values)
            #print(len(values))
            #print(int(len(values)/2))
            mean[attribut]=(values[int(len(values)/2)])
        return mean

    def Get_closest(cluster , mean):
        distances={}
        i=0
        for object in cluster:
            #object[0]  is the id of the operator
            distances[i]=(Calculate_distance(mean,object))
            i+=1
        mini=min(distances.values())
        for key,value in distances.items():
            if value==mini:
                return cluster[key]

    def Get_objects(year):
        myclient = pymongo.MongoClient('localhost', 27017)
        mydb = myclient['dump']
        mycollection = mydb["Statement"]
        return list(mycollection.find({'Date':year}))

    def Are_equal(oldones , newones):
        old_id=[]
        for old in oldones:
            old_id.append(old['_id'])
        for new in newones:
            if new['_id'] not in old_id:
                return 0

        return 1

    def Make_statistics(objects):
        statistics={}
        attribute_values={}
        for attribute in attributes:
            attribute_values[attribute]=[]
        for object in objects:
            for attribute in attributes:
                attribute_values[attribute].append(object[attribute])

        for attribute in attributes:
            stat=list(filter((-1).__ne__, attribute_values[attribute]))
            if len(stat)==0:
                stat=[-1]
            statistics['mean_'+attribute]= Get_mean(list(stat))
            statistics['max_'+attribute]=max(list(stat))
            statistics['min_'+attribute]=min(list(stat))
            statistics['avg_'+attribute]=Get_avg(stat)
        return  statistics
    #Statistics
    def Get_mean(values):
        values.sort()
        return values[int(len(values)/2)]
    def Get_avg(values):
        return sum(values)/len(values)


    def Kmeans(list_of_objects,K):
        centers=[]
        # choose center of clusters randomly
        newlist=list_of_objects
        i=len(newlist)-1
        for a in range(0, K):
            indice = random.randint(0, i)
            centers.append(newlist[indice])
            newlist.pop(indice)
            i=i-1

        clusters=Clustering(list_of_objects,centers)
        means=[]
        for (key,cluster) in clusters.items():
            if len(cluster)!=0:
                mean= Get_mean_of_cluster(cluster)
                means.append(Get_closest(cluster, mean))
        count=0
        while Are_equal(means,centers)==0 and count<=10:
            centers=means
            clusters = Clustering(list_of_objects, means)
            means = []
            for (key, cluster) in clusters.items():
                mean = Get_mean_of_cluster(cluster)
                means.append(Get_closest(cluster, mean))
            count+=1

        #for center in centers:
          #  print(center['ID_operator'])

        return (clusters, centers)

    def Get_interclass(centers):
        distances=[]
        for center in centers:
            for object in centers:
                distances.append(Calculate_distance(center,object))
        distances=list(filter(lambda a: a != 0, distances))
        return Get_avg(distances)

    def Get_intraclass(clusters,centers):
        intraclass=0
        dist_center_cluster=0
        for center in centers:
            for object in clusters[str(center['_id'])]:
                dist_center_cluster+=Calculate_distance(center,object)
        intraclass+=dist_center_cluster/len(clusters[str(center['_id'])])
        return (intraclass/len(centers))

    def Get_operator_performance(cluster,maxy):
        _weights=performance_weights[maxy]
        sorted={}
        for operator in cluster:
            population= (operator['Population']- statistics['min_Population'])/(statistics['max_Population']-statistics['min_Population']) *_weights['Population']
            revenue= (operator['Revenue']- statistics['min_Revenue'])/(statistics['max_Revenue']-statistics['min_Revenue']) *_weights['Revenue']
            #nb_sub=(operator['Nb_sub']- statistics['min_Nb_sub'])/(statistics['max_Nb_sub']-statistics['min_Nb_sub']) *_weights['Nb_sub']
            nb_sub=-1
            qos=(operator['QOS']- statistics['min_QOS'])/(statistics['max_QOS']-statistics['min_QOS']) *_weights['QOS']
            qon=(operator['QON']- statistics['min_QON'])/(statistics['max_QON']-statistics['min_QON']) *_weights['QON']
            if revenue==0:
                revenue=1
            if population==0:
                population=1
            performance=(-1*nb_sub/population*revenue)*(qos+qon)
            sorted[operator['ID_operator']]=performance
        return sorted

    def Get_Ids_cluster(cluster):
        ids=[]
        for object in cluster:
            ids.append(object['ID_operator'])
        return ids

    def Get_IdOp_Same_Cluster(id_op,clusters):
        for key,cluster in clusters.items():
            ids=Get_Ids_cluster(cluster)
            if id_op in ids:
                ids.remove(id_op)
                return  ids ,cluster


    def Display_in_cloud(sorted_op):
        cloud=[]
        myclient = pymongo.MongoClient('localhost', 27017)
        mydb = myclient['dump']
        mycollection = mydb["Operators"]
        for idx,val in sorted_op:
            dict = {}
            name = mycollection.find_one({'index_YH': idx})['name']
            country = mycollection.find_one({'index_YH': idx})['ISO2']
            dict["text"]=name+','+country##faut laisser la clé text
            dict['idx']=idx
            dict['country']=country
            cloud.append(dict)
        return cloud



    year=2017
    #distance
    weights = {'Gdp': 0.25, 'Population': 0.25, 'Nb_sub': 0.35, 'QOS': 0.25, 'QON': 0.25, 'Revenue': 0.15, 'Capex': 0.15}
    #measure best performance
    maxy_eco_weights={'Gdp': 0.55, 'Population': 0.55, 'Nb_sub': 0.15, 'QOS': 0.15, 'QON': 0.15, 'Revenue': 0.15, 'Capex': 0.15}
    maxy_financial_weights={'Gdp': 0.15, 'Population': 0.15, 'Nb_sub': 0.15, 'QOS': 0.15, 'QON': 0.15, 'Revenue': 0.55, 'Capex': 0.55}
    maxy_media_weights={'Gdp': 0.15, 'Population': 0.15, 'Nb_sub': 0.15, 'QOS': 0.55, 'QON': 0.55, 'Revenue': 0.15, 'Capex': 0.15}
    performance_weights={'Economic':maxy_eco_weights,'Financial':maxy_financial_weights,'Media':maxy_media_weights}

    K=7
    attributes=['Revenue','Capex','QON','QOS','Gdp','Population','Nb_sub']
    objects=Get_objects(year)
    statistics=Make_statistics(objects)

    #print(statistics)
    clusters, centers = Kmeans(objects, K)
    #print(Get_interclass(centers))
    #print(Get_intraclass(clusters, centers))

    #Partie à retourner à Naila
    
    Id=sys.argv[1] 

    try:
        ids,cluster=Get_IdOp_Same_Cluster(Id,clusters)
    except:
        objects = Get_objects(year)
        clusters, centers = Kmeans(objects, K)
        ids,cluster=Get_IdOp_Same_Cluster(Id,clusters)
    
    Maxy=sys.argv[2]

    #id='VFQS.QA' ##iciiiiiiiiiii
    ids,cluster=Get_IdOp_Same_Cluster(Id,clusters)
    #print(ids) #liste des indexes du meme cluster que T.BA
    #Maxy='Economic' # or 'Financial' or 'Media'
    #print(Get_operator_performance(cluster,Maxy) )#return a list
    #print(Get_operator_performance(cluster,'Financial'))
    x=Get_operator_performance(cluster,Maxy)

    #sort keys of  dictionnary by value
    sorted_operators = sorted(x.items(), key=operator.itemgetter(1))
    cloud=Display_in_cloud(sorted_operators)
    info_final={}
    info_final["data_final"]=cloud
    print(info_final)
   