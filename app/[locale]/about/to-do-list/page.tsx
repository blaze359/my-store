import {
  faCircle as faCircleSolid,
  faCircleHalfStroke,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getDynamicConfig } from '@/lib/statsig';

function renderStatusIcon(status: string) {
  switch (status) {
    case 'open':
      return <FontAwesomeIcon icon={faCircleRegular} className="h-6 w-6 text-red-500" />;
    case 'started':
      return <FontAwesomeIcon icon={faCircleHalfStroke} className="h-6 w-6 text-yellow-500" />;
    case 'done':
      return <FontAwesomeIcon icon={faCircleSolid} className="h-6 w-6 text-green-500" />;
    default:
      return null;
  }
}

type Task = {
  id: number;
  task: string;
  status: string;
};

export default async function ToDoListPage() {
  const t = await getTranslations('About');
  const toDoList = (await getDynamicConfig('to_do')) as { list: Task[] };

  const openTasks = toDoList?.list.filter((item) => item.status === 'open');
  const startedTasks = toDoList?.list.filter((item) => item.status === 'started');
  const doneTasks = toDoList?.list.filter((item) => item.status === 'done');

  return (
    <div className="my-6">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faListCheck} className="w-10 h-10" />
        <p>{t('toDoList')}:</p>
      </div>
      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="open">
          <AccordionTrigger className="w-full text-left">
            {t('openTasks')} ({openTasks.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2">
              {openTasks.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {renderStatusIcon(item.status)}
                  <p>{item.task}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="started">
          <AccordionTrigger className="w-full text-left">
            {t('startedTasks')} ({startedTasks.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2">
              {startedTasks.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {renderStatusIcon(item.status)}
                  <p>{item.task}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="done">
          <AccordionTrigger className="w-full text-left">
            {t('doneTasks')} ({doneTasks.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2">
              {doneTasks.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {renderStatusIcon(item.status)}
                  <p>{item.task}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
