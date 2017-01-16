function   kmeans1( filename )
%UNTITLED MDS 聚类
%   此处显示详细说明
      
    fid = fopen(filename);
    title = textscan(fid, '%s %s %s',1,'delimiter', ',');
    Y = textscan(fid, '%s  %f %f','delimiter', ',');
    fclose(fid);
    dcellneeds1 = Y(1:1);
    dcellneeds = Y(2:3);
    str=(dcellneeds1(1));
    str= str{1};
    Mat = cell2mat(dcellneeds);  
    Idx1=kmeans(Mat,4);
    Idx2=kmeans(Mat,5);
    columns = {'id', 'x', 'y', 'class1','class2' };
    data = table(str,Mat(:,1),Mat(:,2),Idx1,Idx2, 'VariableNames', columns); % 基于这些单独的变量创建一个table类型变量data
    writetable(data, filename)
end