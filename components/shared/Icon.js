import styled from "@emotion/styled";
import {FaChevronLeft, FaSearch} from "react-icons/fa";
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md";
import {FiUploadCloud,FiRss,FiAlertCircle,FiUsers} from "react-icons/fi";
import {AiOutlineMail, AiTwotoneLock,AiOutlineBell} from "react-icons/ai";
import {BsArrowRight, BsArrowLeft, BsChevronRight,BsChatLeft} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {RiSuitcaseLine} from "react-icons/ri";



export const BackIcon = styled(FaChevronLeft)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
    position: ${props => props.isabsolute === false ? 'relative' : 'absolute' };
    left: 5%;
    top: 5%;
    cursor: pointer;
`

export const PhotoIcon = styled(MdOutlinePhotoSizeSelectActual)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const RightArrowIcon = styled(BsArrowRight)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const LeftArrowIcon = styled(BsArrowLeft)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const RightChevronIcon = styled(BsChevronRight)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const SearchIcon = styled(FaSearch)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const UploadIcon = styled(FiUploadCloud)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`
export const EmailIcon = styled(AiOutlineMail)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const LockIcon = styled(AiTwotoneLock)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const BellIcon = styled(AiOutlineBell)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const ChatIcon = styled(BsChatLeft)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`
export const RssIcon = styled(FiRss)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`
export const UserIcon = styled(BiUser)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const AlertIcon = styled(FiAlertCircle)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const UsersIcon = styled(FiUsers)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

export const CaseIcon = styled(RiSuitcaseLine)`
    color: ${props => props.variant === 'red' ? '#EB4C60' : props.variant === 'green' ? '#4AA398' : '#525252' };
`

const Icon = styled.span`
  color: ${props => props.color === 'red' ? '#EB4C60' : props.color === 'green' ? '#4AA398' : '#525252' };
  font-size: 14px;
`

export default Icon;