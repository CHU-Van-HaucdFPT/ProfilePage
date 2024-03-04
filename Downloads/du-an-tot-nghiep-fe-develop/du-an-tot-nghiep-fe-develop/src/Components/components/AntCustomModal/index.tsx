import { useEffect, useState } from 'react';
import { Modal, Input, Typography, Upload, notification, Tooltip } from 'antd';
import { AreaChartOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';

const { Text } = Typography;
const { TextArea } = Input;

import style from './AntCustomModal.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(style);

const TYPES = [
    {
        id: 0,
        name: 'Dạng tin 0',
        icon: <AreaChartOutlined className={cx('icon')} />
    },
    // {
    //     id: 1,
    //     name: 'Dạng tin 1',
    //     icon: <AreaChartOutlined className={cx('icon')} />
    // },
    // {
    //     id: 2,
    //     name: 'Dạng tin 2',
    //     icon: <AreaChartOutlined className={cx('icon')} />
    // },
    // {
    //     id: 3,
    //     name: 'Dạng tin 3',
    //     icon: <AreaChartOutlined className={cx('icon')} />
    // },
    // {
    //     id: 4,
    //     name: 'Dạng tin 4',
    //     icon: <AreaChartOutlined className={cx('icon')} />
    // },
    // {
    //     id: 5,
    //     name: 'Dạng tin 5',
    //     icon: <AreaChartOutlined className={cx('icon')} />
    // }
];

interface IAntCustomModal {
    actionCreate: any;
    dataUpdate?: any;
}
const AntCustomModal = (props: IAntCustomModal) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [shortContent, setShortContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [typeSelected, selectType] = useState(0);

    useEffect(() => {
        if (props.dataUpdate) {
            const dataUpdate = props.dataUpdate;

            setTitle(dataUpdate.title);
            setContent(dataUpdate. content);
            setShortContent(dataUpdate.shortContent);
            setImageUrl(dataUpdate.imageUrl);
        };
    }, []);

    const textLengthNotZero = (input: string) => {
        return (input ?? '').trim().length >= 1;
    };

    const onSubmit = () => {
        const dataSend = {
            title: title,
            shortContent: shortContent,
            content: content,
            // imageUrl: imageUrl,
            imageUrl: "image.png",
            statusNews: 0
        };

        if (!textLengthNotZero(title)) {
            notification.error({ message: 'Tiêu đề không được để trống!' });
        } else if (!textLengthNotZero(shortContent)) {
            notification.error({ message: 'Mô tả không được để trống!' });
        } else if (!textLengthNotZero(content)) {
            notification.error({ message: 'Nội dung không được để trống!' });
        } else if (!textLengthNotZero(imageUrl)) {
            notification.error({ message: 'Ảnh không được để trống!' });
        } else {
            setOpen(false);
            if (!props.dataUpdate) {
                props.actionCreate(dataSend);
            } else {
                props.actionCreate({ ...dataSend, newId: props.dataUpdate._id }, props.dataUpdate._id);
            }
            // console.log(dataSend);
            // Nếu cần thiết thì clear data sau khi upload
        }
    };

    return (
        <>
            <Tooltip title={props.dataUpdate ? 'Chỉnh sửa' : 'Tạo mới'}>
                <div className={cx('add')} onClick={() => setOpen(true)}>
                    {
                        !props.dataUpdate ?
                            <PlusOutlined className={cx('icon')} />
                            :
                            <EditOutlined className={cx('icon')}/>
                    }
                </div>
            </Tooltip>
            <Modal
                title={
                    <div className={cx('modalTitle')} style={{ fontSize: 25 }}>
                        Tin tức
                    </div>
                }
                centered
                open={open}
                onOk={() => {
                    onSubmit();
                }}
                onCancel={() => setOpen(false)}
                width={100+'%'}
            >
                <div className={cx('modalType')}>
                    {TYPES.map((item) => (
                        <div
                            className={cx('typeName', typeSelected === item.id ? 'selected' : '')}
                            key={`type-${item.id}`}
                            onClick={() => selectType(item.id)}
                        >
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                        </div>
                    ))}
                </div>
                <div className={cx('modalBody')}>
                    <div className={cx('information')}>
                        <div className={cx('leftContainer')}>
                            <Text>
                                TIÊU ĐỀ <span className={cx('required')}>*</span>
                            </Text>
                            <Input
                                className="mb-px"
                                placeholder="Nhập tiêu đề"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <ImageUploadComponent
                                onChangeImage={(base64: any) => {
                                    setImageUrl(base64);
                                }}
                            />
                        </div>
                        <div className={cx('rightContainer')}>
                            <Text>
                                MÔ TẢ <span className={cx('required')}>*</span>
                            </Text>
                            <TextArea
                                rows={4}
                                placeholder="Nhập mô tả"
                                maxLength={200}
                                value={shortContent}
                                onChange={(e) => {
                                    setShortContent(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            // console.log(event);
                            setContent(editor.getData());
                        }}
                    />
                </div>
                <div className={cx('modalFooter')}></div>
            </Modal>
        </>
    );
};

// This should be on another file =====================================================================>
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface ImageUploadProps {
    onChangeImage: any;
}
const ImageUploadComponent = (props: ImageUploadProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        // Chỉ lưu trữ file đầu tiên trong newFileList
        setFileList(newFileList.slice(0, 1));

        const file = newFileList[0];
        const base64 = await getBase64(file.originFileObj as RcFile);
        props.onChangeImage(base64);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <Text>ẢNH BÀI VIẾT</Text>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default AntCustomModal;
