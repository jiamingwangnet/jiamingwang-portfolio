export default interface IDownload
{
    url:string;
    downloads: ({type:string,download:string,name:string})[]
}