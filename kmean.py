import random
import pymongo

import sys

if __name__ == '__main__':  
    index=sys.argv[1] 
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
    
    def Clustering(list_of_objects,centers,K):
        clusters = {}
        distances = {}  # key is indice of center , value is distance with object
        for i in range(0, K):
            clusters[str(centers[i]['_id'])]=[]
        # assign each object to the closest cluster
        for object in list_of_objects:
            for i in range(0, K):
                distances[i] = Calculate_distance(centers[i], object)
    
            mini = min(distances,key=distances.get)  # get the closest center
            clusters[str(centers[mini]['_id'])].append(object)
    
        return clusters #clusters is a dict , the key is the id of the center , value is list of other objects
    
    def Get_mean_of_cluster(cluster):
        mean={}
        values=[]
        for attribut in attributes:
            for object in cluster:
                values.append(object[attribut])
            values.sort()
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
            statistics['mean_'+attribute]= Get_mean(attribute_values[attribute])
            statistics['max_'+attribute]=max(attribute_values[attribute])
            statistics['min_'+attribute]=min(attribute_values[attribute])
            statistics['avg_'+attribute]=Get_avg(attribute_values[attribute])
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
        for a in range(0, K):
            indice = random.randint(0, len(objects))
            centers.append(list_of_objects[indice])
    
        clusters=Clustering(list_of_objects,centers,K)
        means=[]
        for (key,cluster) in clusters.items():
            mean=Get_mean_of_cluster(cluster)
            means.append(Get_closest(cluster, mean))
    
        while Are_equal(means,centers)==0:
            centers=means
            clusters = Clustering(list_of_objects, means,K)
            means = []
            for (key, cluster) in clusters.items():
                mean = Get_mean_of_cluster(cluster)
                means.append(Get_closest(cluster, mean))
    
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
    
    def Get_best_operator(cluster):
        max=0
        for operator in cluster:
            performance=-1*operator['Nb_sub']/operator['Population'] * operator['Revenue']
            if max<performance:
                max=performance
                best=operator
        return best
    
    
    
    
    K=3
    year=2017
    weights = {'Gdp': 0.25, 'Population': 0.25, 'Nb_sub': 0.35, 'QOS': 0.25, 'QON': 0.25, 'Revenue': 0.15, 'Capex': 0.15}
    attributes=['Revenue','Capex','QON','QOS','Gdp','Population','Nb_sub']
    objects=Get_objects(year)
    statistics=Make_statistics(objects)
    #print(statistics)
    clusters,centers=Kmeans(objects,K)
    print(Get_interclass(centers))
    #print(Get_intraclass(clusters,centers))
    
    '''
    for key,cluster in clusters.items():
    Get_best_operator(cluster)
    '''
    














