import React from 'react';
import { FaUser } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const UserMenu = ({ onItemClick }) => {
    const navigate = useNavigate();

    const handleMinhaConta = () => {
        navigate('/user');
        onItemClick();
    };

    const handleConfiguracao = () => {
        onItemClick();
    };

    const handleSair = () => {
        onItemClick();
    };

    return (
        <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={wrapperVariants}
            style={{ originY: "top" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute right-[0.05rem] mt-2 w-48 z-10 overflow-hidden border border-gray-200"
        >
            <Option 
                Icon={FaUser} 
                text="Minha Conta" 
                onClick={handleMinhaConta} 
            />
            <Option 
                Icon={FiSettings} 
                text="Configurações" 
                onClick={handleConfiguracao} 
            />
            <Option 
                Icon={FiLogOut} 
                text="Sair" 
                onClick={handleSair} 
            />
        </motion.ul>
    );
};

const Option = ({ text, Icon, onClick }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={onClick}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-gray-100 text-slate-700 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon size={16} className="mr-2" />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

const wrapperVariants = {
    open: {
        scaleY: 1,
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        opacity: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};

export default UserMenu;