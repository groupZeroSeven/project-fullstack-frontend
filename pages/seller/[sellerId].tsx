import { Footer } from '@/src/components/footer';
import { Header } from '@/src/components/header';
import { ProfileAdvertiser } from '@/src/components/profile';
import { LoadContext } from '@/src/contexts/loadingContext';
import { UserContext } from '@/src/contexts/userContext';
import { IUser } from '@/src/interfaces/user';
import { api } from '@/src/services/api';
import { DashboardStyle } from '@/src/styles/dashboard';
import {
  Body_1_400,
  Body_2_400,
  Details,
  Heading_5_600,
  Heading_6_600,
  Heading_7_500,
  Heading_7_600,
  ProductCardStyled,
} from '@/src/styles/global';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const router = useRouter();

  const { sellerId } = router.query;

  const { setLoad } = React.useContext(LoadContext);

  const { user, userLogout, myAnnouncementSeller, setMyAnnouncementSeller } =
    React.useContext(UserContext);

  const [userSeller, setUserSeller] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    setLoad(true);

    const token: string | null = localStorage.getItem('token');

    if (!token) return userLogout();

    if (user && sellerId) {
      const getAnnouncement = async () => {
        try {
          const { data } = await toast.promise(
            api.get(`/api/anoucementUser/${sellerId}`),
            {}
          );

          setUserSeller(data.data[0].user);
          setMyAnnouncementSeller(data.data);
        } catch (e: any) {
          toast.error(e.response.data.message, {
            position: 'bottom-right',
            autoClose: 5000,
          });
        } finally {
          setLoad(false);
        }
      };

      getAnnouncement();
    }
    setLoad(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, sellerId]);

  return (
    <>
      <Header />
      <DashboardStyle style={{ maxHeight: '25rem' }}>
        {userSeller && (
          <>
            <aside>
              <Image
                src={'/image/profile.png'}
                alt="Profile"
                width={104}
                height={104}
              />
              <span
                style={{ display: 'flex', gap: '9px', alignContent: 'center' }}
              >
                <Heading_6_600>{userSeller?.name}</Heading_6_600>
                <Details href="#annount">
                  {userSeller?.is_seller ? 'Anunciante' : 'Client'}
                </Details>
              </span>
              <Body_1_400>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                rem consectetur at, esse expedita eos eius id deleniti voluptas
                amet nobis explicabo maxime sit culpa, blanditiis temporibus
                ratione, placeat animi?
              </Body_1_400>
            </aside>

            <Heading_5_600 style={{ paddingLeft: '2.9rem' }} id="annount">
              Anúncios
            </Heading_5_600>
            <ul>
              {myAnnouncementSeller &&
                myAnnouncementSeller.map((el) => (
                  <ProductCardStyled
                    key={el.id}
                    onClick={() => router.push(`/details/${el.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="img">
                      <Image
                        src={el.banner}
                        alt="Photo"
                        width="250"
                        height="140"
                      />
                    </div>
                    <Heading_7_600>{`${el.brand} - ${el.model}`}</Heading_7_600>
                    <Body_2_400>{el.description}</Body_2_400>
                    <ProfileAdvertiser
                      imgProfile="/image/profile.png"
                      nameProfile={userSeller?.name}
                    />
                    <span>
                      <Details href="#">{el.mileage}</Details>
                      <Details href="#">{el.year}</Details>
                      <Heading_7_500>{`R$: ${el.price}`}</Heading_7_500>
                    </span>
                  </ProductCardStyled>
                ))}
            </ul>
          </>
        )}

        <div>
          <Heading_5_600>
            <span className="pageAtt">1</span>{' '}
            <span className="next">de 2</span>
          </Heading_5_600>
          <Heading_5_600
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-brand-2)',
              cursor: 'pointer',
            }}
          >
            Seguinte {'>'}
          </Heading_5_600>
        </div>
        <Footer />
      </DashboardStyle>
    </>
  );
}