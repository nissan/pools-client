import React, { Fragment, useEffect, useRef } from 'react';
import { Children } from 'libs/types/General';
import { useResizeDetector } from 'react-resize-detector';
import { Menu, Transition } from '@headlessui/react';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { classNames } from '@libs/utils/functions';
import { Logo, LogoTicker } from 'components/General/Logo';

/**
 * Similar component to dropdown only there is no content to begin with
 */
type HEProps = {
    defaultHeight: number; // defaults to 0
    open: boolean;
    className?: string;
} & Children;
export const HiddenExpand: React.FC<HEProps> = ({ className, children, defaultHeight, open }: HEProps) => {
    const main = useRef<HTMLDivElement>(null);
    const { height, ref } = useResizeDetector();

    useEffect(() => {
        const m = main.current as unknown as HTMLDivElement;
        if (open) {
            // all heights plus 10px for padding
            m.style.height = `${height ?? 0}px`;
        } else {
            m.style.height = `${defaultHeight}px`;
        }
    }, [open, height]);

    return (
        <div
            className={classNames(
                className ?? '',
                'overflow-visible transition-all duration-300 ease-in-out mb-4 mt-8 rounded-md',
            )}
            ref={main}
        >
            <div className="body" ref={ref}>
                <Transition
                    show={open}
                    enter="transition-opacity duration-300 delay-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {children}
                </Transition>
            </div>
        </div>
    );
};

const SIZE = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-4 py-2 text-sm',
    default: 'pl-3 pr-2 py-2 text-sm ',
    lg: 'p-3 text-base',
    none: 'p-0 text-base',
};

const VARIANTS: Record<ButtonVariant, string> = {
    default:
        'border border-theme-border bg-theme-button-bg text-theme-text hover:bg-theme-button-bg-hover focus:border-solid ',
    tracer: 'border-none bg-tracer-500 matrix:bg-theme-primary matrix:text-black text-white hover:bg-tracer-600 focus:border-none',
    unselected: 'border-none bg-tracer-100 dark:bg-cool-gray-700 text-white focus:border-none',
};

export type ButtonVariant = 'default' | 'tracer' | 'unselected';

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'default' | 'none';

interface DropdownProps {
    value: string;
    placeHolder?: string;
    placeHolderIcon?: LogoTicker;
    options: {
        key: string;
        text?: string;
        ticker?: LogoTicker;
    }[];
    onSelect: (option: string) => void;
    size?: ButtonSize;
    className?: string;
    variant?: ButtonVariant;
}
export const Dropdown: React.FC<DropdownProps> = ({
    value,
    placeHolder = 'Select',
    options,
    onSelect,
    placeHolderIcon,
    size = 'default',
    variant = 'default',
    className,
}) => {
    return (
        <Menu as="div" className={`${className || ''} relative inline-block text-left`}>
            <Menu.Button
                className={classNames(
                    `inline-flex justify-between w-full rounded-md`,
                    SIZE[size],
                    'font-normal focus:outline-none hover:ring-1 hover:ring-50',
                    VARIANTS[variant],
                )}
            >
                <span className="mr-2 opacity-80">
                    {placeHolderIcon && value !== '' ? (
                        <Logo ticker={placeHolderIcon} className="inline my-0 mr-2" />
                    ) : null}
                    {value === '' ? placeHolder : value}
                </span>
                {options.length ? (
                    <DownOutlined className="flex items-center h-4 w-4 ml-auto mr-0 my-auto " aria-hidden="true" />
                ) : (
                    <LoadingOutlined className="flex items-center h-4 w-4 ml-auto mr-0 my-auto " aria-hidden="true" />
                )}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-theme-button-bg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {options.map((option) => (
                            <Menu.Item key={option.key}>
                                {({ active }) => (
                                    <button
                                        onClick={() => onSelect(option.key)}
                                        className={classNames(
                                            active ? 'bg-theme-button-bg-hover' : 'text-theme-text opacity-80',
                                            'block px-4 py-2 text-sm w-full text-left',
                                        )}
                                    >
                                        {option?.ticker ? (
                                            <Logo ticker={option.ticker} className="inline my-0 mr-3" />
                                        ) : (
                                            ''
                                        )}
                                        {option?.text ?? option.key}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
