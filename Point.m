function   Point( filename )
%UNTITLED MDS ���������ļ�
%   �˴���ʾ��ϸ˵��
    [num] = xlsread(filename); 
    n=size(num,1);  
    t=zeros(n,n);  
    for i=1:n  
        for j=1:n  
            t(i,j)=-0.5*(num(i,j)^2 -1/n*num(i,:)*num(i,:)' -1/n*num(:,j)'*num(:,j) +1/n^2*sum(sum(num.^2)));  
        end  
    end  
    [V,D] = eig(t)  
    X=V(:,1:2)*D(1:2,1:2).^(1/2);  
    %scatter(-X(:,2),X(:,1));  %axis([-100000,100000,-100000,100000]);
    head = [120,121];
    X=[head;X];
    a=filename(10:13);
    csvwrite(['total/point',a,'_total.csv'],X)

end

