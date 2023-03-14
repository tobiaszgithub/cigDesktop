import { useEffect, useState } from "react";
import { GetIntegrationPackages, SetTenantKey } from "../../../wailsjs/go/main/App";
import { Space, Table, Tag, Spin } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;
interface DataType {
  key: React.Key;
  Id: string;
  Name: string;
  CreatedBy: string;
  CreationDate: string;
  ModifiedBy: string;
  ModifiedDate: string;
  Version: string;
  Mode: string;
  ShortText: string;
}


const IntegrationPackagesTable = () => {
  const { tenantKey } = useParams();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState([])

  const columns: ColumnsType<DataType> = [

    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
      width: 300,
      render: (id: string) => (
        <Link to={`/tenants/${tenantKey}/packages/${id}`}>
          {id}
        </Link>
      ),
      filters: filters,
      filterSearch: true,
      onFilter: (value1, record) => record.Id.indexOf(value1 as string) === 0,
      sorter: (a: { Id: string; }, b: { Id: string; }) => a.Id.localeCompare(b.Id),  
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      width: 300,
      onFilter: (value, record) => record.Name.indexOf(value as string) === 0,
      ellipsis: true,
    },
    {
      title: 'CreatedBy',
      dataIndex: 'CreatedBy',
      key: 'CreatedBy',
    },
    {
      title: 'CreationDate',
      dataIndex: 'CreationDate',
      key: 'CreationDate',
      render: (timestamp: string) => {
        let date: Date = new Date(parseInt(timestamp));
        return <div>
          {date.toISOString().slice(0,10)}
        </div>;
      },
    },
    {
      title: 'ModifiedBy',
      dataIndex: 'ModifiedBy',
      key: 'ModifiedBy',
    },
    {
      title: 'ModifiedDate',
      dataIndex: 'ModifiedDate',
      key: 'ModifiedDate',
      render: (timestamp: string) => {
        let date: Date = new Date(parseInt(timestamp));
        return <div>
          {date.toISOString().slice(0,10)}
        </div>;
      },
    },
    {
      title: 'Version',
      dataIndex: 'Version',
      key: 'Version',
    },
    {
      title: 'Mode',
      dataIndex: 'Mode',
      key: 'Mode',
    },

    {
      title: 'ShortText',
      dataIndex: 'ShortText',
      key: 'ShortText',
      render: function (html: string) {
        let text: string = html.substring(0, 200).trim()

        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
      ellipsis: true,
    },
  ];

  useEffect(() => {
    const getPackages = async () => {
      setIsLoading(true);
      
      await SetTenantKey(tenantKey);
      const packages: any = await GetIntegrationPackages();

      setPackages(packages);

      setFilters(packages.map((item: { Id: string; }) => {
        const key = item.Id.split(' ')[0]
        return {
          text: key,
          value: key
        }
      }))

      setIsLoading(false);
      console.log("integraion packages:")
      console.log(packages)
    };
    getPackages();
  }, [tenantKey]);

  return (
    <>
      <Title level={5}>Integration Packages:</Title>
      <Spin tip="Loading" spinning={isLoading}>
        <Table columns={columns} dataSource={packages} pagination={{ pageSize: 25 }} scroll={{ x: 1500}}/>
      </Spin>

    </>
  );
};


export default IntegrationPackagesTable;